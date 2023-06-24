import React from 'react'
import {useDispatch} from "react-redux";
import {setAuth} from "../../redux/reducers/AuthReducer";
import styles from './Headers.module.scss'
import {useLocation} from "react-router-dom";


export const Headers = () => {
    const dispatch = useDispatch();
    const url = useLocation()
    let title = ''
    switch (url.pathname) {
        case "/accounts" :
            title = "Счета";
            break;
        case "/operations" :
            title = "Операции"
            break;

    }

    console.log(url)
    const logout = () => {
        dispatch(setAuth(null));
        localStorage.clear()
    };

   return  <div className={styles.header}>
        <h1>{title}</h1>
        <button
            style={{width: 50, height: 30, background: "#87d7ad"}}
            onClick={logout}
        >
            Logout
        </button>
    </div>
}