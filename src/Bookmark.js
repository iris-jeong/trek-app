import save from "./images/save.png";
import savehover from "./images/savehover.png";
import { useState } from "react";

function Bookmark(props) {
	const { onSave, isSaved, isUsers } = props;
	const [isHover, setIsHover] = useState(false);
	const [alt, setAlt] = useState("Save Icon");
	useState(() => {
		if (!isSaved) {
			setAlt("Save Icon");
		} else {
			setAlt("Saved Icon");
		}
	}, [isSaved]);

	return isUsers ? (
		<></>
	) : (
		<img
			data-testid="bookmark"
			className="save-img"
			src={isSaved || isHover ? savehover : save}
			alt={alt}
			onClick={onSave}
			onMouseOver={() => {
				setIsHover(true);
			}}
			onMouseOut={() => {
				setIsHover(false);
			}}
		></img>
	);
}

export default Bookmark;
