import React from 'react'
import styles from './Menu.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {setAuth} from "../../redux/reducers/AuthReducer";
import {useDispatch} from "react-redux";

const menuData = [
    {
        id: 1,
        path: "/operations",
        title: "Операции",
        icon: "#transactions",
        iconActive: "#transactionsActive"
    }, {
        id: 2,
        path: "/accounts",
        title: "Счета",
        icon: "#accounts",
        iconActive: "#accountsActive"
    }, {
        id: 3,
        path: "/",
        title: "Бюджет",
        icon: "#budget",
        iconActive: "#budgetActive"
    }, {
        id: 4,
        path: "/income",
        title: "Доходы",
        icon: "#revenues",
        iconActive: "#revenuesActive"
    }, {
        id: 5,
        path: "/",
        title: "Расходы",
        icon: "#expenses",
        iconActive: "#expensesActive"
    }, {
        id: 6,
        path: "/",
        title: "Отчеты",
        icon: "#reports",
        iconActive: "#reportsActive"
    },
]

export const Menu = ({handleClose}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(setAuth(null));
        localStorage.clear()
        navigate('/login')
    };


    const setMenu = () => {
        handleClose()
    }

    return <nav className={styles.wrap}>
        {menuData.map(t => <NavLink key={t.id} onClick={() => setMenu(t.id)}
                                    className={({isActive}) => isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem}
                                    to={t.path}>
            {({isActive}) => (
                <>
                    <svg>
                        <use href={isActive ? t.iconActive : t.icon}/>
                    </svg>
                    <span>{t.title}</span>
                </>
            )}

        </NavLink>)}

        <button onClick={logout} className={styles.logout}>Logout</button>
    </nav>
}