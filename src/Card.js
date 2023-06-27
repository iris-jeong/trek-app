import moment from "moment";
import Bookmark from "./Bookmark";
import InfoBar from "./InfoBar";
import "./css/card.css";
import "./css/infobar.css";
import { useEffect, useRef, useState } from "react";
import defaultimg from "./images/defaultimg.png";
import ny from "./images/ny.jpeg";
import bali from "./images/bali.jpeg";
import peru from "./images/peru.jpeg";
import tokyo from "./images/tokyo.jpeg";
import greece from "./images/greece.jpeg";
import { saveItinerary, unsaveItinerary, fetchUser } from "./api";
import { toast } from "react-toastify";

function Card(props) {
	const { id, name, city, country, start_date, end_date, type, cost } =
		props.itinerary;
	const { index, isUsers } = props;
	let loggedInUserId = 0;
	const [isSaved, setIsSaved] = useState();
	const savedDate = useRef("");

	// console.log(props.itinerary);
	// console.log(userId);
	const images = [
		{ id: index, src: ny },
		{ id: 1, src: bali },
		{ id: 2, src: peru },
		{ id: 3, src: tokyo },
		{ id: 4, src: greece },
		{ id: index, src: defaultimg },
		{ id: index + 1, src: defaultimg },
		{ id: index + 2, src: defaultimg },
		{ id: index + 3, src: defaultimg },
		{ id: index + 4, src: defaultimg },
	];

	if (index === images.length) {
		images.push({ id: index, src: defaultimg });
	}

	useEffect(() => {
		//1. Get the user's information using the ID.
		fetchUser(loggedInUserId).then((data) => {
			//2. Get the saved itineraries.
			const { saved } = data;
			//3. Set whether the bookmark is saved.
			setIsSaved(saved.includes(id));
		});
	}, [savedDate]);

	function onSave(event) {
		//1. Prevent default.
		event.preventDefault();
		setIsSaved(!isSaved);

		//2. Get the itinerary ID the user is trying to save.
		let itineraryId =
			event.currentTarget.parentElement.parentElement.parentElement.id;

		//3. Get the user ID.
		let userId = 0;

		//If the user hasn't already saved the itinerary
		if (!isSaved) {
			//3. Save the itinerary.
			saveItinerary(userId, itineraryId).then(() => {
				toast.success("The itinerary has been saved!", {
					autoClose: 400,
				});
				// console.log("Saved the itinerary!");
				savedDate.current = new Date();
				console.log(savedDate.current);
			});
		} else {
			//4. Otherwise unsave the itinerary.
			unsaveItinerary(userId, itineraryId).then(() => {
				toast.success("The itinerary has been unsaved.", {
					autoClose: 400,
				});
				console.log("Itinerary unsaved!");
			});
			savedDate.current = "";
		}
	}

	const numDays = moment(end_date).diff(moment(start_date), "days");
	// console.log(index);
	return (
		<div className="card-container" id={id}>
			<div className="card-header">
				<img className="card-img" src={images[index].src} alt={name} />
				{/* <img className="card-img" src={defaultimg} alt={name} /> */}
				<button type="button" className="save-btn">
					<Bookmark onSave={onSave} isSaved={isSaved} />
				</button>
			</div>
			<div className="card-body">
				<div className="card-title">
					<div className="title" data-testid="name">
						{name}
					</div>
				</div>
				<div className="card-text" data-testid="place">
					{city}, {country}
				</div>
			</div>
			<InfoBar
				month={moment(start_date).format("MMM")}
				days={numDays + 1}
				type={type}
				cost={cost}
			/>
			<div>{savedDate.current}</div>
		</div>
	);
}

export default Card;
