import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (

    <div className="form-group">

      <label>{label}</label>

      <div className="input-wrapper">

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />

        {isPassword && (

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >

            {showPassword ? <FaEyeSlash /> : <FaEye />}

          </button>

        )}

      </div>

    </div>

  );

};

export default Input;