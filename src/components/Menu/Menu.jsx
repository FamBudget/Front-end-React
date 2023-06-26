import React, {useState} from 'react'
import styles from './Menu.module.scss'
import {NavLink} from "react-router-dom";
import {setAuth} from "../../redux/reducers/AuthReducer";
import {useDispatch} from "react-redux";

const menuData = [
    {
        id: 1,
        path: "/operations",
        title: "Операции",
        icon: "#transactions",
        iconActive: "#transactionsActive"
    },{
        id: 2,
        path: "/accounts",
        title: "Счета",
        icon: "#accounts",
        iconActive: "#accountsActive"
    },{
        id: 3,
        path: "/operations",
        title: "Бюджет",
        icon: "#budget",
        iconActive: "#budgetActive"
    },{
        id: 4,
        path: "/income",
        title: "Доходы",
        icon: "#revenues",
        iconActive: "#revenuesActive"
    },{
        id: 5,
        path: "/operations",
        title: "Расходы",
        icon: "#expenses",
        iconActive: "#expensesActive"
    },{
        id: 6,
        path: "/operations",
        title: "Отчеты",
        icon: "#reports",
        iconActive: "#reportsActive"
    },
]

export const Menu = ({handleClose}) => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setAuth(null));
        localStorage.clear()
    };
    const setMenu = (id) => {
        setActive(id)
        handleClose()
    }
const [active, setActive] = useState(1)

    return <nav className={styles.wrap}>
        {menuData.map(t => <NavLink key={t.id} onClick={() => setMenu(t.id)} className={active === t.id  ? `${styles.menuItem} ${styles.active}` : styles.menuItem}
                 to={t.path}>
            <svg>
                <use href={active === t.id ? t.iconActive : t.icon}/>
            </svg>

            <span>{t.title}</span> </NavLink>)}

        <button onClick={logout} className={styles.logout}>Logout</button>
    </nav>
}