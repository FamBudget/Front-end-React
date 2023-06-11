import React, {useState} from 'react'
import styles from './Menu.module.scss'
import {NavLink} from "react-router-dom";

const menuData = [
    {
        id: 1,
        path: "/operations",
        name: "Операции",
        icon: "#transactions",
        iconActive: "#transactionsActive"
    },{
        id: 2,
        path: "/accounts",
        name: "Счета",
        icon: "#accounts",
        iconActive: "#accountsActive"
    },{
        id: 3,
        path: "/operations",
        name: "Бюджет",
        icon: "#budget",
        iconActive: "#budgetActive"
    },{
        id: 4,
        path: "/operations",
        name: "Доходы",
        icon: "#revenues",
        iconActive: "#revenuesActive"
    },{
        id: 5,
        path: "/operations",
        name: "Расходы",
        icon: "#expenses",
        iconActive: "#expensesActive"
    },{
        id: 6,
        path: "/operations",
        name: "Отчеты",
        icon: "#reports",
        iconActive: "#reportsActive"
    },
]

export const Menu = () => {
const [active, setActive] = useState(1)

    return <nav className={styles.wrap}>
        {menuData.map(t => <NavLink key={t.id} onClick={() => setActive(t.id)} className={active === t.id  ? `${styles.menuItem} ${styles.active}` : styles.menuItem}
                 to={t.path}>
            <svg>
                <use href={active === t.id ? t.iconActive : t.icon}/>
            </svg>
            <span>{t.name}</span> </NavLink>)}


    </nav>
}