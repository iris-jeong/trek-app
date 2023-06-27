import { useRef, useEffect } from "react";

export default function Checkbox(props) {
	const { label, checked, isIndeterminate, onChange } = props;
	const checkboxRef = useRef();

	useEffect(() => {
		checkboxRef.current.indeterminate = isIndeterminate;
	}, [isIndeterminate]);

	return (
		<label className="list-item">
			<input
				type="checkbox"
				ref={checkboxRef}
				checked={checked ? checked : false}
				onChange={(event) => {
					onChange(event.target.checked);
				}}
			/>
			{label}
		</label>
	);
}
