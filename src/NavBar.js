import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/navbar.css";

function NavBar() {
	return (
		<nav className="navbar-container">
			<div className="navbar">
				<div>
					<Link to="/" className="navbar-main nav-link">
						Trek
					</Link>
				</div>
				<div className="nav-items-container">
					<div className="nav-item">
						<Link to="/admin" className="nav-link">
							Admin
						</Link>
					</div>
					<div className="nav-item">
						<Link to="/" className="nav-link">
							Create
						</Link>
					</div>
					<div className="nav-item">
						<Link to="/itineraries" className="nav-link">
							Explore
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
