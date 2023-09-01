import React from 'react'
import {useDispatch} from "react-redux";
import {setAuth} from "../../redux/reducers/AuthReducer";
import styles from './Header.module.scss'
import {useLocation, useNavigate} from "react-router-dom";


export const Header = ({handleOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const logout = () => {
        dispatch(setAuth(null));
        localStorage.clear()
        navigate('/login')
    };


    return <>
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <h1 className={styles.logo}>BudgetFamily</h1>
            <div className={styles.menuIcon}><svg onClick={handleOpen}>
                <use href="#menuIcon"/>
            </svg></div>

            <div className={styles.exit} onClick={() => logout()}>
                <svg onClick={handleOpen}>
                    <use href={`#exit`}/>
                </svg>
            </div>
        </div>
        <div className={styles.subHeader}>
            <h1>{title}</h1>

        </div>
    </>
}