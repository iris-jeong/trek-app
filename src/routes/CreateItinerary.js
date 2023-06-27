import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createItinerary } from "../api";
import "../css/createitinerary.css";
import Button from "../Button";
import TimeInput from "../inputs/TimeInput";
import TextInput from "../inputs/TextInput";
import Select from "../inputs/Select";

function CreateItinerary() {
	useEffect(() => {
		document.title = "Create Itinerary";
	}, []);

	//1. Extract the dates from searchParams and use Moment.js to calculate the days between and create initialSections
	const [searchParams] = useSearchParams();
	const travelTo = searchParams.get("travelto");
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");
	const numDays = moment(endDate).diff(moment(startDate), "days");

	//2. Set state for the title.
	const [title, setTitle] = useState("");

	//3. Initialize the default sections.
	const initialSections = [];
	for (let i = 0; i <= numDays; i++) {
		initialSections.push({
			id: `day-${i + 1}`,
			day: i + 1,
			date: moment(startDate).add(i, "days").format("L"),
			activities: [{ time: "", description: "", location: "" }],
		});
	}
	// console.log(initialSections);
	//4. Set state for the sections.
	const [sections, setSections] = useState(initialSections);

	//5. Set state for form submission.
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [type, setType] = useState("Solo");
	const [cost, setCost] = useState("$");
	const [isFormValid, setIsFormValid] = useState(false);
	const [isError, setIsError] = useState(false);
	const errors = {
		title: "Please enter a trip name.",
		city: "Please enter the city.",
		state: "Please enter the state or province.",
		activity: "Please fill out at least one activity",
	};

	//5. Handle onSubmit
	const navigate = useNavigate();
	function handleSubmit(event) {
		event.preventDefault();
		console.log(sections);

		let userId = "0";
		//Save the itinerary in the DB.
		return createItinerary(
			userId,
			title,
			city,
			state,
			travelTo,
			startDate,
			endDate,
			type,
			cost,
			sections
		).then(() => {
			toast.success("Your itinerary has been created!", {
				autoClose: 400,
			});

			function navigateTo() {
				navigate(`/profile/${userId}`);
			}

			setTimeout(navigateTo, 1300);
		});
	}

	function handleTimeChange(event, index, i) {
		let updatedSections = sections;
		updatedSections[index].activities[i].time = event;
		setSections(updatedSections);
	}
	function handleActivityChange(event, index, i) {
		let updatedSections = sections;

		updatedSections[index].activities[i].description = event;
		setSections(updatedSections);
	}
	function handleLocationChange(event, index, i) {
		let updatedSections = sections;

		updatedSections[index].activities[i].location = event;
		setSections(updatedSections);
	}
	function handleValidation(event) {
		event.preventDefault();
		let isValid = true;

		//If the title is empty.
		if (title === "") {
			isValid = false;
			document.querySelector("#title-error").innerHTML = errors.title;
		} else {
			setIsError(false);
			document.querySelector("#title-error").innerHTML = "";
		}
		//If the city is empty.
		if (city === "") {
			isValid = false;
			document.querySelector("#city-error").innerHTML = errors.city;
		} else {
			setIsError(false);
			document.querySelector("#city-error").innerHTML = "";
		}
		//If the state/province is empty.
		if (city === "") {
			isValid = false;
			document.querySelector("#state-error").innerHTML = errors.state;
		} else {
			setIsError(false);
			document.querySelector("#state-error").innerHTML = "";
		}
		//If there are no activities in the itinerary.
		let activity = sections[0].activities[0];
		if (
			activity.time === "" &&
			activity.description === "" &&
			activity.location === ""
		) {
			setIsError(true);
			document.querySelector("#activity-error").innerHTML =
				errors.activity;
		} else {
			setIsError(false);
			document.querySelector("#activity-error").innerHTML = "";
		}
		setIsFormValid(isValid);

		if (isValid) {
			let userId = "0";
			//Save the itinerary in the DB.
			return createItinerary(
				userId,
				title,
				city,
				state,
				travelTo,
				startDate,
				endDate,
				type,
				cost,
				sections
			).then(() => {
				toast.success("Your itinerary has been created!", {
					autoClose: 400,
				});

				function navigateTo() {
					navigate(`/profile/${userId}`);
				}

				setTimeout(navigateTo, 1300);
			});
		}
	}

	return (
		<div className="create-itinerary-page">
			{/* Itinerary Form */}
			<div className="itinerary-form-container">
				<form
					onSubmit={isFormValid ? handleSubmit : handleValidation}
					className="planner-form-container"
				>
					{/* Header */}
					<div className="header">
						<h1>Create your itinerary</h1>
						<hr></hr>
					</div>
					<div className="title-container">
						<TextInput
							id="title-input"
							myClass="title-input"
							label="Trip Name"
							name="title"
							// defaultValue={title}
							onChange={(event) => {
								setTitle(event);
							}}
						/>
						<small id="title-error" className="error"></small>
					</div>

					<div className="citystate-container">
						<div className="city-container">
							<TextInput
								id="city"
								myClass="city-state-input"
								label="What city?"
								value={city}
								onChange={(event) => {
									setCity(event);
								}}
							/>
							<small id="city-error" className="error"></small>
						</div>
						<div className="state-container">
							<TextInput
								id="state"
								myClass="city-state-input"
								label="Which state/province?"
								value={state}
								onChange={(event) => {
									setState(event);
								}}
							/>
							<small id="state-error" className="error"></small>
						</div>
					</div>
					<br></br>
					<hr></hr>
					<h2>Activities</h2>
					{
						<>
							<div className="create-activity-list">
								{/* Each Section */}
								{sections.map((section, index) => {
									return (
										<div
											className="each-day"
											key={index}
											id={index}
										>
											<div className="day">
												Day {section.day}{" "}
												<div className="date">
													{moment(
														section.date
													).format("ddd, MMMM Do")}
												</div>
											</div>
											<small id="activity-error"></small>

											{section.activities.map(
												(activity, i) => {
													return (
														<div
															key={i}
															day={index}
															id={i - 1}
															className="activity-container"
														>
															<div className="each-activity">
																<div className="time-container">
																	<TimeInput
																		id={`timeday${section.day}activity${i}`}
																		myClass="time-input"
																		onChange={(
																			event
																		) => {
																			handleTimeChange(
																				event,
																				index,
																				i
																			);
																		}}
																	/>
																	{/* <small
																	id="time-error"
																	className="error"
																></small> */}
																</div>
																<TextInput
																	id={`activityday${section.day}activity${i}`}
																	label="Activity"
																	myClass="activity-input"
																	onChange={(
																		event
																	) => {
																		handleActivityChange(
																			event,
																			index,
																			i
																		);
																	}}
																/>

																<TextInput
																	id={`locationday${section.day}activity${i}`}
																	label="Location"
																	myClass="location-input"
																	onChange={(
																		event
																	) => {
																		handleLocationChange(
																			event,
																			index,
																			i
																		);
																	}}
																/>
															</div>
														</div>
													);
												}
											)}
											<div className="add-button-container">
												<Button
													myClass="add-button"
													type="button"
													onClick={() => {
														const updatedSection = {
															...section,
															activities: [
																...section.activities,
																{},
															],
														};

														const updatedSections =
															sections.map(
																(section) => {
																	if (
																		section.id ===
																		updatedSection.id
																	) {
																		return updatedSection;
																	}

																	return section;
																}
															);

														setSections(
															updatedSections
														);
													}}
												>
													+ Add Activity
												</Button>
											</div>
										</div>
									);
								})}
							</div>
						</>
					}
					<div className="type-cost-container">
						<div className="type-container">
							<Select
								label="Type of Trip?"
								value={type}
								name="type"
								options={[
									{ value: "solo", label: "Solo" },
									{ value: "family", label: "Family" },
									{ value: "friends", label: "Friends" },
								]}
								onChange={(event) => {
									setType(event.target.value);
								}}
							/>
							<small id="type-error" className="error"></small>
						</div>
						<div className="cost-container">
							<Select
								label="Cost of Trip?"
								value={cost}
								name="cost"
								options={[
									{ value: "$", label: "$" },
									{ value: "$$", label: "$$" },
									{ value: "$$$", label: "$$$" },
									{ value: "$$$$", label: "$$$$" },
								]}
								onChange={(event) => {
									setCost(event.target.value);
								}}
							/>
							<small id="cost-error" className="error"></small>
						</div>
					</div>
					<div className="button-container">
						<Button type="submit" myClass="create-button">
							Create itinerary
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateItinerary;
