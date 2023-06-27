import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../NavBar";

function Root() {
	return (
		<div className="container>">
			<NavBar />
			<Outlet />
			<ToastContainer />
		</div>
	);
}

export default Root;
