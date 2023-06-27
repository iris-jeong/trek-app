function Select(props) {
	const { label, value, onChange, name, myClass } = props;
	return (
		<>
			<label className="input-label">{label}</label>
			<select
				name={name}
				className={`input ${myClass}`}
				value={value}
				onChange={(event) => {
					onChange(event);
				}}
			>
				{props.options.map((option) => {
					return (
						<option value={option.value} key={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
		</>
	);
}

export default Select;
