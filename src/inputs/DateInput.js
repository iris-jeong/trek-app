function DateInput(props) {
	const { id, myClass, label, value, onChange } = props;
	// console.log(defaultDate);
	return (
		<div className={`input-group ${myClass}`}>
			<label htmlFor={id} className="input-label">
				{label}
			</label>
			<input
				className="input-date"
				type="date"
				id={id}
				name={id}
				value={value}
				onChange={(event) => {
					onChange(event.target.value);
				}}
			/>
		</div>
	);
}

export default DateInput;
