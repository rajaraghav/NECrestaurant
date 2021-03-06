import {
	BOOK_TABLE,
	BOOK_TABLE_FAILED,
	FETCH_BOOKINGS,
	FETCH_BOOKINGS_FAILED
} from "../Action/types";

export default (state = null, action) => {
	switch (action.type) {
		case BOOK_TABLE:
			if (action.payload === "") return false;
			return action.payload;
		case BOOK_TABLE_FAILED:
			return action.payload;
		case FETCH_BOOKINGS:
			console.log("iga");
			return action.payload;
		case FETCH_BOOKINGS_FAILED:
			console.log("igf");
			return action.payload;
		default:
			return state;
	}
};
