import React from 'react'
import styles from './Header.module.scss'
import {useLocation} from "react-router-dom";
import {Logout} from "../Logout/Logout";


export const Header = ({handleOpen}) => {

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
        case "/expense" :
            title = "Расходы"
            break;
        case "/settings" :
            title = "Настройки"
            break;

    }


    return <>
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <h1 className={styles.logo}>BudgetFamily</h1>
            <div className={styles.menuIcon}><svg onClick={handleOpen}>
                <use href="#menuIcon"/>
            </svg></div>

            <div className={styles.exit} >
                <Logout />
            </div>
        </div>
        <div className={styles.subHeader}>
            <h1>{title}</h1>

        </div>
    </>
}