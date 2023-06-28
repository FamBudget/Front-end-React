import React from "react";
import styles from './Income.module.scss'
import {MovingAccounts} from "../../components/MovingAccounts/MovingAccounts";
import {Container} from "../../components/Container/Container";
import {IncomeCategories} from "../../components/Categories/IncomeCategories";


export const Income = () => {

    return <Container>
        <div className={styles.wrapper}>
            <IncomeCategories/>
            <MovingAccounts/>
        </div>
    </Container>

};
