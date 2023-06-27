/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import InfoBar from "./InfoBar";
import Card from "./Card";

test("info bar", () => {
	const { getByTestId } = render(
		<InfoBar month="Jan" days="5" type="Friends" cost="$$" />
	);

	//Verify info bar information.
	// eslint-disable-next-line testing-library/prefer-screen-queries
	expect(getByTestId("info-month").textContent.trim()).toBe("Jan");
	expect(getByTestId("info-days").textContent.trim()).toBe("5 days");
	expect(getByTestId("info-type").textContent.trim()).toBe("Friends");
	expect(getByTestId("info-cost").textContent.trim()).toBe("$$");
});

test("card", () => {
	let testitinerary = {
		id: "0",
		name: "Big Apple Foodie-venture",
		city: "Brooklyn",
		state_province: "New York",
		country: "United States",
		start_date: "2020-08-13",
		type: "Family",
		cost: "$$",
	};
	const { getByTestId } = render(
		<Card itinerary={testitinerary} id={testitinerary.id} />
	);

	// eslint-disable-next-line testing-library/prefer-screen-queries
	expect(getByTestId("name").textContent.trim()).toBe(
		"Big Apple Foodie-venture"
	);
	expect(getByTestId("place").textContent.trim()).toBe(
		"Brooklyn, United States"
	);
	expect(getByTestId("info-month").textContent.trim()).toBe("Aug");
	expect(getByTestId("info-type").textContent.trim()).toBe("Family");
	expect(getByTestId("info-cost").textContent.trim()).toBe("$$");
	const bookmarkIcon = getByTestId("bookmark");
	fireEvent.click(bookmarkIcon);
	expect(getByTestId("bookmark").getAttribute("alt")).toEqual("Save Icon");
});
