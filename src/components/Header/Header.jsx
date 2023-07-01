import React from 'react'
import {useDispatch} from "react-redux";
import {setAuth} from "../../redux/reducers/AuthReducer";
import styles from './Header.module.scss'
import {useLocation} from "react-router-dom";


export const Header = ({handleOpen}) => {
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
        case "/income" :
            title = "Доходы"
            break;

    }

    const logout = () => {
        dispatch(setAuth(null));
        localStorage.clear()
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    };

    return <>
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <h1 className={styles.logo}>BudgetFamily</h1>
            <svg onClick={handleOpen}>
                <use href="#menuIcon"/>
            </svg>

            <button
                style={{width: 50, height: 30, background: "#87d7ad"}}
                onClick={logout}
            >
                Logout
            </button>
        </div>
        <div className={styles.subHeader}>
            <h1>{title}</h1>

        </div>
    </>
}