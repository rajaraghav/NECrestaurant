const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test("Browser support", async () => {
	const check = await page.performExecution("navigator.userAgent");
	var ua = check,
		tem,
		M =
			ua.match(
				/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
			) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return "IE " + (tem[1] || "");
	}
	if (M[1] === "Chrome") {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem != null)
			return tem
				.slice(1)
				.join(" ")
				.replace("OPR", "Opera");
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
	var x = Number(M[1]);
	console.log(x); //Browser support tested.
	expect(x).toBeGreaterThanOrEqual(38);
});

test("Login Button", async () => {
	await page.click("#headerButtonLogin");

	console.log(await page.getContentsOf("#loginPopupButtonLogin"));
}); // Login button tested.

test("SignUp Button", async () => {
	await page.click("#headerButtonSignup");
	console.log(await page.getContentsOf("#loginPopupButtonSignup"));
}); //SignUp successful.
