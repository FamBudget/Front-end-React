import React from 'react'
import styles from './Sidebar.module.scss'
import {Menu} from "../Menu/Menu";


export const Sidebar = ({handleClose}) => {
    return <>
        <div className={styles.sidebarContainer}>
            <span className={styles.logo}> FamilyBudget</span>
            <Menu handleClose={handleClose}/>
        </div>
    </>
}