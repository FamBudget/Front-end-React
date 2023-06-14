import React from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export const Button = ({ text, type, className, children, disabled}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(styles.button, className)}
    >
      {children}{text}
    </button>
  );
};
