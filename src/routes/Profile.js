import tommy from "../images/tommy.jpeg";
import "../css/profile.css";
import TabContainer from "../TabContainer";
import location from "../images/location.png";
import {
	useLoaderData,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import BackButton from "../BackButton";
import { fetchItinerary, fetchSavedItineraries, fetchUser } from "../api";
import { useEffect, useState } from "react";
import Button from "../Button";

function Profile() {
	const itineraries = useLoaderData();
	const params = useParams();
	const [savedItineraries, setSavedItineraries] = useState([]);
	// console.log(itineraries);

	//1. Fetch the profile page user's data.
	//a. Get the ID of the profile page/user Id
	let userId = params.id;
	//b. Make the fetch call to get the user using the profile page ID (userId of whose page it is)
	useEffect(() => {
		//i. Set the document title.
		fetchUser(userId).then((data) => {
			document.title = `${data.first_name} ${data.last_name}'s Profile`;
		});
		//ii. Retrieve the user's saved itineraries for the 'Saved' tab.
		fetchSavedItineraries(userId).then((data) => {
			setSavedItineraries(data);
		});
	}, []);
	//2. Render the itineraries in the 'Saved' tab.
	//a. Pass savedItineraries as a prop to the TabContainer component.

	return (
		<div className="profile-page">
			{/* <div className="back-div">
				<BackButton />
			</div> */}
			<div className="profile-container">
				<div className="profile-header">
					<div className="img-container">
						<img
							className="profile-img"
							src={tommy}
							alt="Profile Pic"
						/>
					</div>
					<div className="profile-details">
						<div className="name">
							{itineraries[0].user.first_name}
						</div>
						<div className="pf-username">
							@{itineraries[0].user.username}
						</div>
						<div className="location">
							<img
								className="location-icon"
								src={location}
								alt="Location Icon"
							/>
							{itineraries[0].city},{" "}
							{itineraries[0].state_province}
						</div>
					</div>
				</div>
				<div className="profile-body">
					<TabContainer
						itineraries={itineraries}
						savedItineraries={savedItineraries}
					/>
				</div>
			</div>
		</div>
	);
}

export default Profile;
