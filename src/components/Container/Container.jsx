import React from 'react'
import styles from './Container.module.scss'
import {useSelector} from "react-redux";


export const Container = ({children}) => {
    const email = useSelector((state) => state.auth.email);

    return <>{email && <div className={styles.container}>{children}</div>}</>
}