import { useNavigate } from "react-router-dom";

export function _fetch(url) {
	return fetch(url).then((response) => {
		return response.json();
	});
}

//** ITINERARIES **/
// Fetch all itineraries.
export function fetchItineraries() {
	return _fetch("http://localhost:3000/itineraries?_expand=user");

	// return _fetch(
	// 	"https://trek-itinerary-app.herokuapp.com/api/itineraries?&_expand=user"
	// );
}
// Fetch a specific itinerary by itinerary ID.
export function fetchItinerary(itineraryId) {
	return _fetch(
		`http://localhost:3000/itineraries/${itineraryId}?_expand=user`
	);

	// return _fetch(
	// 	`https://trek-itinerary-app.herokuapp.com/api/itineraries/${itineraryId}?_expand=user`
	// );
}
// Fetch a specific itinerary by user ID.
export function fetchUserItineraries(userId) {
	return fetchItineraries().then((data) => {
		const userItineraries = data.filter(
			(itinerary) => itinerary.userId === userId
		);
		return userItineraries;
	});
}
// export function addItinerary(itinerary) {
// 	console.log(JSON.stringify(itinerary));
// 	return fetch("http://localhost:3000/itineraries", {
// 		method: "POST",
// 		body: JSON.stringify({

// 		}),
// 		headers: {
// 			"Content-type": "application/json",
// 		},
// 	}).then((response) => {
// 		return response.json();
// 	});
// }
// POST request to create an itinerary.
export function createItinerary(
	userId_,
	title_,
	city_,
	state_,
	country_,
	start_,
	end_,
	type_,
	cost_,
	formData_
) {
	let itinerary = {};

	//1. Parse the form data to get the activities into an array of objects.
	let numDays = formData_.length;
	let days = [];
	for (let i = 0; i < numDays; i++) {
		let activities = [];

		for (let j = 0; j < formData_[i].activities.length; j++) {
			let data = formData_[i].activities;
			// console.log(data);
			activities.push({
				location: data[j].location,
				description: data[j].description,
				start_time: data[j].time,
			});
		}
		days.push({
			day: formData_[i].day,
			activities: activities,
		});

		itinerary = {
			name: title_,
			city: city_,
			state_province: state_,
			country: country_,
			start_date: start_,
			end_date: end_,
			type: type_,
			cost: cost_,
			days: days,
		};
	}
	// console.log("ITINERARY:", itinerary);

	//2. Make the fetch call.
	return fetch("http://localhost:3000/itineraries", {
		method: "POST",
		body: JSON.stringify({
			name: title_,
			city: city_,
			state_province: state_,
			country: country_,
			start_date: start_,
			end_date: end_,
			type: type_,
			cost: cost_,
			days: days,
			userId: userId_,
		}),
		headers: {
			"Content-type": "application/json",
		},
	}).then((response) => {
		return response.json();
	});
}

// PATCH request to bookmark an itinerary.
export function saveItinerary(userId, itineraryId) {
	return fetchUser(userId).then((data) => {
		const { saved } = data;
		//1. Append the itinerary id the user wants to save.
		let updatedSaved = [...saved, itineraryId];

		//2. Make the fetch call to update the user's saved list.
		return fetch(`http://localhost:3000/users/${userId}`, {
			method: "PATCH",
			body: JSON.stringify({
				saved: updatedSaved,
			}),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				// console.log(json);
			});
	});
}
// PATCH request to UNbookmark an itinerary.
export function unsaveItinerary(userId, itineraryId) {
	return fetchUser(userId).then((data) => {
		const { saved } = data;

		//1. Filter out the itinerary the user wants to unbookmark.
		let updatedSaved = saved.filter((itinID) => {
			return itinID != itineraryId;
		});

		//2. Make the fetch call to update the user's saved list.
		return fetch(`http://localhost:3000/users/${userId}`, {
			method: "PATCH",
			body: JSON.stringify({
				saved: updatedSaved,
			}),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				// console.log(json);
			});
	});
}
// Fetch call to request all the itineraries a user has saved.
export function fetchSavedItineraries(userId) {
	return fetchUser(userId)
		.then((data) => {
			let itineraryIds = data.saved;
			return itineraryIds;
		})
		.then((itineraryIds) => {
			const itineraries = [];
			//For each itinerary id in itineraryIds, retrieve the itinerary.
			for (let i = 0; i < itineraryIds.length; i++) {
				return fetchItinerary(itineraryIds[0]).then((data) => {
					let updatedItineraries = [...itineraries, data];
					return updatedItineraries;
				});
			}
		});
}
//Fetch call to update an itinerary after editing
export function updateItinerary(
	itineraryId,
	title,
	city,
	state,
	sections,
	type,
	cost
) {
	let numDays = sections.length;
	let itinerary = {};
	let days = [];
	for (let i = 0; i < numDays; i++) {
		let activities = [];
		for (let j = 0; j < sections[i].activities.length; j++) {
			let data = sections[i].activities;

			activities.push({
				id: data[j].id,
				location: data[j].location,
				activity: data[j].activity,
				start_time: data[j].start_time,
			});
		}
		days.push({
			day: sections[i].day,
			activities: activities,
		});

		itinerary = {
			name: title,
			city: city,
			state_province: state,
			type: type,
			cost: cost,
			days: days,
		};
	}

	// console.log(itinerary);
	return fetch(`http://localhost:3000/itineraries/${itineraryId}`, {
		method: "PATCH",
		body: JSON.stringify({
			name: title,
			city: city,
			state_province: state,
			type: type,
			cost: cost,
		}),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			// console.log(json);
		});
}

export function deleteItinerary(itineraryId) {
	return fetch(`http://localhost:3000/itineraries/${itineraryId}`, {
		method: "DELETE",
	})
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			// console.log(json);
		});
}

//** COMMENTS **/
export function fetchComments(itineraryId) {
	return _fetch(
		`http://trek-itinerary-app.herokuapp.com/api/itineraries/${itineraryId}/comments`
	);
}

//** USERS **/
export function fetchUsers() {
	return _fetch("http://localhost:3000/users");

	// return _fetch(`https://trek-itinerary-app.herokuapp.com/api/users`);
}
export function fetchUser(userId) {
	return _fetch(`http://localhost:3000/users/${userId}`);

	// return _fetch(
	// 	`https://trek-itinerary-app.herokuapp.com/api/users/${userId}`
	// );
}
