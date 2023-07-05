import React, {useEffect} from 'react'
import {Categories} from "./Categories";
import {useDispatch, useSelector} from "react-redux";
import {fetchIncomeCategories, addIncomeCategories} from "../../redux/reducers/CategoriesReducer";
import {AddingOperation} from "../AddingOperation/AddingOperation";
import styles from './Categories.module.scss'
import {fetchAccounts} from "../../redux/reducers/AccountsReducer";
import {addIncome} from "../../redux/reducers/OperationsReducer";


export const IncomeCategories = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIncomeCategories())
    }, [])
    const addIncomeCategoriesCallback = (values) => {
        dispatch(addIncomeCategories(values))
    }
    const addIncomeCallback = (values) => {
        dispatch(addIncome(values))
    }
    useEffect(() => {
        dispatch(fetchAccounts())
    }, [])
    const dataAccounts = useSelector(state => state.accounts.data)
    const dataCategories = useSelector(state => state?.categories?.incomeCategories)
    const arrayIconIncome = [0, 1, 2, 3, 4, 5]
    console.log(dataCategories)
    return <div className={styles.wrapper}>
        <AddingOperation title={'Добавить доход'} dataCategories={dataCategories} dataAccounts={dataAccounts} addOperations={addIncomeCallback}/>
        <Categories addCategories={addIncomeCategoriesCallback} dataCategories={dataCategories} title={"income"} arrayIcon={arrayIconIncome}/>


    </div>
}