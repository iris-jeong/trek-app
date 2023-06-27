export default function TextInput(props) {
	const {
		myClass,
		label,
		id,
		value,
		defaultValue,
		onChange,
		name,
		children,
	} = props;
	// console.log(label);
	// console.log(value);
	return (
		<div className={`input-group ${myClass}`}>
			<label htmlFor={id} className="input-label">
				{label}
				{children}
			</label>

			<input
				className="input"
				type="text"
				name={name}
				id={id}
				value={value}
				// value={value ? value : defaultValue}
				onChange={(event) => {
					onChange(event.target.value);
				}}
			/>
		</div>
	);
}
