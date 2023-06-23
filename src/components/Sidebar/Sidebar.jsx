import React from 'react'
import styles from './Sidebar.module.scss'
import {Menu} from "../Menu/Menu";



export const Sidebar = () => {
    return <div className={styles.sidebarContainer}>
        <span className={styles.logo}> FamilyBudget</span>
        <Menu/>
    </div>
}