import "../css/edititinerary.css";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteItinerary, fetchItinerary, updateItinerary } from "../api";
import BackButton from "../BackButton";
import Modal from "../Modal";
import TextInput from "../inputs/TextInput";
import Select from "../inputs/Select";
import Button from "../Button";
import moment from "moment";
import { toast } from "react-toastify";
function EditItinerary() {
	//1. Retrieve the itinerary using the itinerary id (useParams)
	const [itinerary, setItinerary] = useState();
	const params = useParams();

	//2. Initalize the form data values
	const initialSections = [];
	const [sections, setSections] = useState();

	useEffect(() => {
		document.title = "Edit Itinerary";
		fetchItinerary(params.id).then((data) => {
			setItineraryId(data.id);
			setItinerary(data);
			setTitle(data.name);
			setCity(data.city);
			setState(data.state_province);
			setSections(initialSections);
			setType(data.type);
			setCost(data.cost);
		});
	}, []);

	//2. Render a form with prepopulated values from the itinerary
	const [itineraryId, setItineraryId] = useState("");
	const [title, setTitle] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [type, setType] = useState();
	const [cost, setCost] = useState();

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		setIsFormSubmitted(true);

		console.log("Form submitted!");

		//Update the itinerary.
		return updateItinerary(
			itineraryId,
			title,
			city,
			state,
			sections,
			type,
			cost,
			navigate
		);
	}
	const redirectUser = () => {
		navigate("/profile/0");
	};
	function handleDelete(event) {
		event.preventDefault();
		console.log("Deleted Itinerary!");
		return deleteItinerary(itineraryId).then(() => {
			toast.success("Your itinerary has been deleted!", {
				autoClose: 400,
			});

			setTimeout(redirectUser, 1300);
		});
	}

	function onClose() {
		navigate(-1);
	}
	return isFormSubmitted ? (
		<div>
			<Modal title="Sucess!">
				<p>Your changes have been saved!</p>
				<Button
					myClass="edit-success-button"
					type="button"
					onClick={onClose}
				>
					Go back to your itinerary.
				</Button>
				{/* <button type="button" onClick={onClose}>
					Go back to your itinerary.
				</button> */}
			</Modal>
		</div>
	) : (
		itinerary && (
			<div className="itinerary">
				<div className="back-div">
					<BackButton />
				</div>
				<form onSubmit={handleSubmit} className="edit-form-container">
					<div className="title-container">
						<TextInput
							id="title-input"
							myClass="title-input"
							label="Trip Name"
							name="title"
							value={title}
							onChange={(event) => {
								setTitle(event);
							}}
						/>
						<small id="title-error" className="error"></small>
					</div>

					<div className="edit-city-state-container">
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

					<div className="edit-type-cost-container">
						<div className="type-container">
							<Select
								label="Type of Trip?"
								value={type}
								name="type"
								options={[
									{ value: "Solo", label: "Solo" },
									{ value: "Family", label: "Family" },
									{ value: "Friends", label: "Friends" },
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
					<div className="edit-button-container">
						<Button
							type="button"
							myClass="create-button"
							onClick={handleDelete}
						>
							Delete
						</Button>
						<Button type="submit" myClass="create-button">
							Save Edit
						</Button>
					</div>
					{/* <div className="btn-container">
						<button
							className="btn delete-btn"
							onClick={handleDelete}
						>
							Delete
						</button>
						<button className="btn create-btn" type="submit">
							Save edit
						</button>
					</div> */}
				</form>
			</div>
		)
	);
}

export default EditItinerary;
