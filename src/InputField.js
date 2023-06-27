import { Form } from "react-router-dom";

function InputField(props) {
  const { label, type, className, name } = props;
  return (
    <div className="input-group">
      <label htmlFor="floatingInputValue">{label}</label>
      <input
        type={type}
        className={`input ${className}`}
        id="floatingInputValue"
        name={name}
        onChange={(e) => {
          // console.log(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default InputField;
