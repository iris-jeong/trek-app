import "./css/modal.css";
import { createPortal } from "react-dom";

function Modal(props) {
	const { title, children } = props;

	return createPortal(
		<>
			<div className="custom-modal-backdrop"></div>
			<div className="custom-modal">
				<div className="modal-content">
					<h3>{title}</h3>
					<div>{children}</div>
				</div>
			</div>
		</>,
		document.getElementById("modal-container")
	);
}

export default Modal;
