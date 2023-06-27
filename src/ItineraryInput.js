import { useLoaderData } from "react-router-dom";
import "./css/itineraryinput.css";

function ItineraryInput(props) {
  const { day, date, time, description, place } = props;
  return (
    <>
      <div className="header-container"></div>
      <div className="day">Day {day}</div>
      <div className="date">{date}</div>
      <div className="form-group-container">
        <div className="form-group-inner-container">
          <div className="form-group time-group">
            <label htmlFor="time" className="form-label">
              Time:
            </label>

            <input
              type="time"
              id="time-input"
              name="time"
              defaultValue={time}
            />
          </div>
          <div className="form-group activity-group">
            <label htmlFor="activity" className="form-label">
              Activity Description:
            </label>

            <input
              type="text"
              id="activity-input"
              name="activity"
              defaultValue={description}
            />
          </div>
          <div className="form-group location-group">
            <label htmlFor="location" className="form-label">
              Place:
            </label>

            <input
              type="text"
              id="location-input"
              name="location"
              defaultValue={place}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ItineraryInput;
