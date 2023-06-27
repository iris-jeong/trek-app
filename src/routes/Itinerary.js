import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertTime } from "../functions";
import "../css/itinerary.css";
import InfoBar from "../InfoBar";
import BackButton from "../BackButton";
import moment from "moment";

function Itinerary() {
	const itinerary = useLoaderData();
	const {
		id,
		name,
		start_date,
		end_date,
		type,
		days,
		cost,
		city,
		country,
		user,
		saved,
	} = itinerary;
	// console.log(saved);
	// console.log(itinerary);

	const [isEditable, setIsEditable] = useState(false);

	//I. Render the edit button only if the logged in user ID matches the user ID of the itinerary. (If it's the user's itinerary).
	//1. Get the logged in user id.
	let loggedInUser = "0";
	//2. Check if the itinerary was created by the logged in user.
	useEffect(() => {
		if (user.id === loggedInUser) {
			setIsEditable(true);
		}

		document.title = name;
	}, []);

	const numDays = moment(end_date).diff(moment(start_date), "days");
	return (
		<div className="itinerary-page">
			<div className="back">
				<BackButton />
			</div>
			<div className="itinerary">
				<div className="header">
					<div className="title">
						<h1>{name}</h1>
						{isEditable && (
							<Link
								className="edit-itinerary-link"
								to={`/itineraries/${id}/edit`}
							>
								Edit
							</Link>
						)}
					</div>

					<div className="location">
						<h2>
							{city}, {country}
						</h2>
					</div>

					<InfoBar
						month={moment(start_date).format("MMM")}
						days={numDays + 1}
						type={type}
						cost={cost}
					/>
					<div className="username-container">
						<Link
							className="username"
							to={`/profile/${user.id}`}
							state={{ from: { id } }}
						>
							@{user.username}
						</Link>
					</div>
				</div>
				<hr></hr>
				{days.map((day, index) => {
					return (
						<div key={index} className="day-container">
							<h3>Day {day.day}</h3>
							<div className="activities-container">
								{day.activities.map((activity, i) => {
									return (
										<div
											key={i}
											className="activity-container"
										>
											<div className="activity">
												<div className="time">
													{convertTime(
														activity.start_time
													)}
												</div>
												<div className="activity-name">
													{activity.description}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Itinerary;
