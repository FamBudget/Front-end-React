import React from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export const Button = ({ text, type, isSubmitting, className, children }) => {
  return (
    <button
      disabled={isSubmitting}
      type={type}
      className={classNames(styles.button, className)}
    >
      {children}{text}
    </button>
  );
};
