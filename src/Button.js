function Button(props) {
	const { type, myClass, onClick, children } = props;

	function handleClick() {}

	return (
		<button
			type={type}
			className={myClass ? `${myClass}` : "button"}
			onClick={onClick ? onClick : handleClick}
		>
			{children}
		</button>
	);
}

export default Button;
