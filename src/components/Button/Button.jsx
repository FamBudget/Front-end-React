import React from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export const Button = ({ text, type, className, children, disabled, onClick}) => {

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(styles.button, className)}
    >
      {children}{text}
    </button>
  );
};
