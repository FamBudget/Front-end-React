import React, { useState } from "react";
import { Field } from "formik";

import { ShowPassword } from "../../icons";

export const PasswordField = ({ placeholder, name, label }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <>
      {label && <label className="label">{label}</label>}
      <div className="password-wrapper">
        <Field
          type={isPasswordShown ? "text" : "password"}
          name={name ? name : "password"}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          className="view-hide"
        >
          <ShowPassword />
        </button>
      </div>
    </>
  );
};

export default PasswordField;
