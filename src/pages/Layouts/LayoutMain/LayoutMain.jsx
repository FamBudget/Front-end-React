import React, { useEffect } from "react";
import { Sidebar, Headers } from "../../../components";
import styles from "./LayoutMain.module.scss";
import { Sprite } from "../../../components";
import { Outlet } from "react-router-dom";
import { setAuth, setEmail } from "../../../redux/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../../redux/reducers/RegistrationReducer";

export const LayoutMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.token && dispatch(setAuth(localStorage.token));
    localStorage.email &&
      dispatch(setEmail(localStorage.email)) &&
      dispatch(setAuth(localStorage.email));
    localStorage.currency && dispatch(setCurrency(localStorage.currency));
  }, []);

  return (
    <>
      <Headers />
      <div className={styles.container}>
        <Sidebar />
      </div>

      <Sprite />
      <Outlet />
    </>
  );
};
