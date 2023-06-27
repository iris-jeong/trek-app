import { useNavigate } from "react-router-dom";
import Button from "./Button";
import leftarrow from "./images/leftarrow.png";
function BackButton() {
	const navigate = useNavigate();
	return (
		<Button
			type="button"
			myClass="back-button"
			onClick={() => navigate(-1)}
		>
			<img className="left-arrow" src={leftarrow} alt="left arrow" />
			<p>Back</p>
		</Button>
	);
}

export default BackButton;
