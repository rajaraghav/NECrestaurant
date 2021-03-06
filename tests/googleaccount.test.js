const Page = require("./helpers/page");

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:3000/");
});

afterEach(async () => {
	await page.close();
});

test.only("dummy", () => {
	expect(2).toEqual(2);
});

test("logging with google", async () => {
	await page.click("#Options");
	await page.click("#googleButton");
	const x = await page.url();
	await page.waitForNavigation(x, { waitUntil: "networkidle" });
	await page.waitForNavigation("https://www.gmail.com");
});
