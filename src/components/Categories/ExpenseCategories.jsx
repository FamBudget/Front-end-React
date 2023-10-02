import React, {useEffect} from 'react'
import {Categories} from "./Categories";
import {useDispatch, useSelector} from "react-redux";
import {addExpenseCategories, fetchExpenseCategories} from "../../redux/reducers/CategoriesReducer";
import {AddingOperation} from "../AddingOperation/AddingOperation";
import styles from './Categories.module.scss'
import {addExpense} from "../../redux/reducers/OperationsReducer";

const arrayIconExpense = [...Array(15).keys()]

export const ExpenseCategories = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchExpenseCategories())
    }, [])
    const addExpensesCategoriesCallback = (values) => {
        dispatch(addExpenseCategories(values))
    }
    const addExpenseCallback = (values) => {
        dispatch(addExpense(values))
    }

    const dataAccounts = useSelector(state => state.accounts.data)
    const dataCategories = useSelector(state => state?.categories?.expenseCategories)
    const dataExpenses = useSelector(state => state?.operations?.expenses)

    let iconCurrency;
    switch (dataAccounts[0] && dataAccounts[0]?.currency) {
        case ("RUB"):
            iconCurrency = "₽"
            break;
        case ("USD"):
            iconCurrency = "$"
            break
        case ("BYN"):
            iconCurrency = "Br"
            break
        case ("EUR"):
            iconCurrency = "€"
            break
        case ("KZT"):
            iconCurrency = "₸"
            break
    }
    let amountTransactions = []
    for (let item of dataExpenses) {
        amountTransactions[item.category.id] = amountTransactions[item.category.id] ? amountTransactions[item.category.id] + item.amount : item.amount
    }

    return <div className={styles.wrapper}>
        <AddingOperation title={'Добавить расход'} dataCategories={dataCategories} dataAccounts={dataAccounts}
                         addOperations={addExpenseCallback}/>
        <Categories iconCurrency={iconCurrency} amountTransactions={amountTransactions}
                    addCategories={addExpensesCategoriesCallback} dataCategories={dataCategories} title={"expense"}
                    arrayIcon={arrayIconExpense}/>


    </div>
}