import React from 'react'
import styles from './Container.module.scss'
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


export const Container = ({children}) => {
    const isAuth = useSelector((state) => state.auth.auth);

    return !isAuth ? (
        <Navigate to="/login"/>
    ) : (<div className={styles.container}>{children}</div>)
}