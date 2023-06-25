import React from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export const Button = ({ text, type, className, children, disabled, handleOpen}) => {

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleOpen}
      className={classNames(styles.button, className)}
    >
      {children}{text}
    </button>
  );
};
