import calendar from "./images/calendar.png";
import user from "./images/user.png";
import airplane from "./images/airplane.png";
import creditcard from "./images/creditcard.png";
import dot from "./images/dot.png";
function InfoBar(props) {
	const { month, days, type, cost } = props;
	// function renderCost(cost) {
	// 	let dollarSigns = "";
	// 	for (let i = 0; i < parseInt(cost); i++) {
	// 		dollarSigns += "$";
	// 	}
	// 	return dollarSigns;
	// }
	// const dollarSigns = renderCost(cost);
	const numDays = parseInt(days);

	return (
		<div className="info-bar-container">
			<div className="info-item">
				<img
					className="info-icon"
					src={calendar}
					alt="Calendar Icon"
				></img>
				<span className="info-text" data-testid="info-month">
					{month}
				</span>
			</div>
			<img className="dot-icon" src={dot} alt="Dot Icon"></img>
			<div className="info-item">
				<img
					className="info-icon"
					src={airplane}
					alt="Airplane Icon"
				></img>
				<span className="info-text" data-testid="info-days">
					{numDays} days
				</span>
			</div>
			<img className="dot-icon" src={dot} alt="Dot Icon"></img>

			<div className="info-item">
				<img className="info-icon" src={user} alt="User Icon"></img>
				<span className="info-text" data-testid="info-type">
					{type}
				</span>
			</div>
			<img className="dot-icon" src={dot} alt="Dot Icon"></img>
			<div className="info-item">
				<img
					className="info-icon"
					src={creditcard}
					alt="Credit Card Icon"
				></img>
				<span className="info-text" data-testid="info-cost">
					{cost}
				</span>
			</div>
		</div>
	);
}

export default InfoBar;
