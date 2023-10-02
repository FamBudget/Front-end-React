import React from "react";
import styles from './Income.module.scss'
import {Container} from "../../components/Container/Container";
import {IncomeCategories} from "../../components/Categories/IncomeCategories";
import {IncomeTableContainer} from "../../components/TableOperations/IncomeTableContainer";


export const Income = () => {

    return <Container>
        <div className={styles.wrapper}>
            <IncomeCategories/>
            <IncomeTableContainer/>
        </div>
    </Container>

};
