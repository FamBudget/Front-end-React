import React from "react";
import {Field} from "formik";
import {BsCheckLg} from "react-icons/bs";

import styles from "./UserCheckField.module.scss";

export const UserCheckField = ({isChecked, setIsChecked}) => {
  return (
    <>
      <label>Проверка</label>
      <label className={styles.checkboxWrapper}>
        <Field
          onClick={() => setIsChecked((prevState) => !prevState)}
          type="checkbox"
          name="userCheck"
        />{" "}
        <span>Я не робот</span>
        {isChecked && <BsCheckLg className={styles.checkIcon} />}
      </label>
    </>
  );
};
