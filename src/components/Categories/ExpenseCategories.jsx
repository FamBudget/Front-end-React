import React, {useEffect} from 'react'
import {Categories} from "./Categories";
import {useDispatch, useSelector} from "react-redux";
import {addExpenseCategories, fetchExpenseCategories} from "../../redux/reducers/CategoriesReducer";
import {AddingOperation} from "../AddingOperation/AddingOperation";
import styles from './Categories.module.scss'
import {fetchAccounts} from "../../redux/reducers/AccountsReducer";
import {addExpense} from "../../redux/reducers/OperationsReducer";

const arrayIconExpense = [...Array(15).keys()]

export const ExpenseCategories = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchExpenseCategories())
        dispatch(fetchAccounts())
    }, [])
    const addIncomeCategoriesCallback = (values) => {
        dispatch(addExpenseCategories(values))
    }
    const addIncomeCallback = (values) => {
        dispatch(addExpense(values))
    }

    const dataAccounts = useSelector(state => state.accounts.data)
    const dataCategories = useSelector(state => state?.categories?.expenseCategories)
    return <div className={styles.wrapper}>
        <AddingOperation title={'Добавить расход'} dataCategories={dataCategories} dataAccounts={dataAccounts} addOperations={addIncomeCallback}/>
        <Categories addCategories={addIncomeCategoriesCallback} dataCategories={dataCategories} title={"expense"} arrayIcon={arrayIconExpense}/>


    </div>
}