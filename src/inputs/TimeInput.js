import { useRef } from "react";

export default function TimeInput(props) {
	const { id, myClass, value, onChange } = props;
	const timeInputRef = useRef(value);

	return (
		<div className={`input-group ${myClass}`}>
			{/* <label htmlFor={id} className="time-label"></label> */}

			<input
				type="time"
				id={id}
				name={id}
				value={value}
				className="input"
				onChange={(event) => {
					onChange(event.target.value);
					timeInputRef.current = event.target.value;
				}}
			/>
		</div>
	);
}
