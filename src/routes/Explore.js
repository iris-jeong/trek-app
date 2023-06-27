import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Card from "../Card";
import "../css/explore.css";

function Explore() {
	const itineraries = useLoaderData();
	console.log(itineraries);
	useEffect(() => {
		document.title = "Explore Itineraries";
	}, []);

	return (
		<div className="explore-page">
			<div className="explore-cards-container">
				<div className="explore-cards">
					{itineraries.map((itinerary, index) => {
						return (
							<Link
								className="itinerary-card"
								key={index}
								to={`/itineraries/${itinerary.id}`}
							>
								<Card
									itinerary={itinerary}
									id={itinerary.id}
									index={index}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Explore;
