import "../css/create.css";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Button";
import TextInput from "../inputs/TextInput";
import DateInput from "../inputs/DateInput";

//A route that shows the <Create/> component.
//It displays a form where you input your destination, start date, and end date.
function Create(props) {
	const navigate = useNavigate();
	useEffect(() => {
		document.title = "Trek Home";
	}, []);

	const [travelTo, setTravelTo] = useState("");
	const isTravel = false;
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isError, setIsError] = useState(false);
	const [isDateError, setIsDateError] = useState(false);
	const errors = {
		travel: "Please enter a country to travel to.",
		date: "Please enter a date range.",
	};

	function handleValidation(event) {
		let isValid = true;

		//If the input field is empty.
		if (travelTo === "") {
			setIsError(true);
			isValid = false;
		} else {
			setIsError(false);
		}
		//If the start or end date is empty.
		if (startDate === "" || startDate === "") {
			setIsDateError(true);
			isValid = false;
			errors.date = "Please enter a date range.";
		}
		//If the start date is after the end date.
		else if (startDate > endDate) {
			setIsDateError(true);
			isValid = false;
			errors.date = "Please select a valid date range.";
		} else {
			setIsDateError(false);
			errors.date = "";
		}

		if (isError || isDateError) {
			isValid = false;
		}

		if (!isValid) {
			event.preventDefault();
		}
	}

	//Set the default start date to today's date.
	// const defaultDate = moment().format("YYYY-M-DD");

	return (
		<div className="create-container">
			<Form
				action={"/create/new"}
				method="get"
				className="form-container"
			>
				<TextInput
					id="travelto"
					myClass="travel-input"
					label="Travel To"
					value={travelTo}
					defaultValue={travelTo}
					name="travelto"
					onChange={(event) => {
						setTravelTo(event);
					}}
				/>
				{isError ? (
					<small className="error travel-error">
						{errors.travel}
					</small>
				) : (
					""
				)}
				<br></br>
				<div className="dates-container">
					<DateInput
						id="startDate"
						myClass="start-input"
						label="Start Date"
						value={startDate}
						onChange={(event) => {
							setStartDate(event);
						}}
					/>
					<div className="divider"></div>
					<DateInput
						id="endDate"
						myClass="end-input"
						label="End Date"
						value={endDate}
						onChange={(event) => {
							setEndDate(event);
						}}
					/>
				</div>
				{isDateError && <small className="error">{errors.date}</small>}
				<div className="button-container">
					<Button
						type="submit"
						myClass="full-width-button"
						onClick={handleValidation}
					>
						Plan Itinerary
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default Create;
