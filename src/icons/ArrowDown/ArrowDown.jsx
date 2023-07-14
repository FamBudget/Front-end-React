import React from "react";
import classNames from "classnames";

import styles from "./ArrowDown.module.scss";

export const ArrowDown = ({ className }) => {
  return (
    <svg className={classNames(styles.icon, className)}>
      <use href="#arrow-down"></use>
    </svg>
  );
};
