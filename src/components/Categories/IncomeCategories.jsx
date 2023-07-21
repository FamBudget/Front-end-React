import React, {useEffect} from 'react'
import {Categories} from "./Categories";
import {useDispatch, useSelector} from "react-redux";
import {fetchIncomeCategories, addIncomeCategories} from "../../redux/reducers/CategoriesReducer";
import {AddingOperation} from "../AddingOperation/AddingOperation";
import styles from './Categories.module.scss'
import {fetchAccounts} from "../../redux/reducers/AccountsReducer";
import {addIncome} from "../../redux/reducers/OperationsReducer";

const arrayIconIncome = [0, 1, 2, 3, 4, 5]

export const IncomeCategories = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIncomeCategories())
        dispatch(fetchAccounts())
    }, [])
    const addIncomeCategoriesCallback = (values) => {
        dispatch(addIncomeCategories(values))
    }
    const addIncomeCallback = (values) => {
        dispatch(addIncome(values))
    }
    const dataAccounts = useSelector(state => state.accounts.data)
    const dataCategories = useSelector(state => state?.categories?.incomeCategories)
    const dataIncomes = useSelector(state => state?.operations?.incomes)
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
    for (let item of dataIncomes) {
        amountTransactions[item.category.id] = amountTransactions[item.category.id] ? amountTransactions[item.category.id] + item.amount : item.amount
    }

    return <div className={styles.wrapper}>
        <AddingOperation title={'Добавить доход'} dataCategories={dataCategories} dataAccounts={dataAccounts}
                         addOperations={addIncomeCallback}/>
        <Categories addCategories={addIncomeCategoriesCallback} iconCurrency={iconCurrency}
                    amountTransactions={amountTransactions} dataCategories={dataCategories} title={"income"}
                    arrayIcon={arrayIconIncome}/>


    </div>
}