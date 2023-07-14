import React from "react";
import styles from './Expense.module.scss'
import {Container} from "../../components/Container/Container";
import {ExpenseTableContainer} from "../../components/TableOperations/ExpenseTableContainer";
import {ExpenseCategories} from "../../components/Categories/ExpenseCategories";


export const Expense = () => {

    return <Container>
        <div className={styles.wrapper}>
            <ExpenseCategories/>
            <ExpenseTableContainer/>
        </div>
    </Container>

};
