import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import styles from './Operations.module.scss'

export const Operations = () => {
    const isAuth = useSelector((state) => state.auth.auth);


    return !isAuth ? (
        <Navigate to="/login"/>
    ) : (
        <div className={styles.container}>


        </div>
    );
};
