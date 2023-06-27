import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	fetchItineraries,
	fetchItinerary,
	fetchProfile,
	fetchUser,
	fetchUserItineraries,
	fetchUserItinerary,
	saveItinerary,
} from "./api";
import Modal from "./Modal";
import Root from "./routes/Root";
import Create from "./routes/Create";
import CreateItinerary from "./routes/CreateItinerary";
import Explore from "./routes/Explore";
import Profile from "./routes/Profile";
import Itinerary from "./routes/Itinerary";
// import CreateConfirmation from "./routes/CreateConfirmation";
import EditItinerary from "./routes/EditItinerary";
import PageNotFound from "./routes/PageNotFound";
import Admin from "./routes/Admin";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Create />,
			},
			{
				path: "/create/new",
				element: <CreateItinerary />,
			},
			{
				path: "/itineraries",
				element: <Explore />,
				loader() {
					return fetchItineraries();
				},
			},
			{
				path: "/itineraries/:id",
				loader({ params }) {
					return fetchItinerary(params.id);
				},
				element: <Itinerary />,
				children: [
					{
						path: "/itineraries/:id",
						element: <div>itinerary</div>,
					},
					// {
					// 	path: "/itineraries/:id/comments",
					// 	loader({ params }) {
					// 		return;
					// 	},
					// },
				],
			},
			{
				path: "/itineraries/:id/edit",
				element: <EditItinerary />,
			},
			{
				path: "/profile/:id",
				loader({ params }) {
					// console.log(params);
					return fetchUserItineraries(params.id);
				},
				element: <Profile />,
			},
			{
				path: "/admin",
				element: <Admin />,
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
