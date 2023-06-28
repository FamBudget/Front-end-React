import React, {useEffect} from 'react'
import {Categories} from "./Categories";
import {useDispatch, useSelector} from "react-redux";
import {fetchIncomeCategories, addIncomeCategories} from "../../redux/reducers/CategoriesReducer";



export const IncomeCategories = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIncomeCategories())
    }, [])
    const addIncomeCategoriesCallback = (values) => {
        dispatch(addIncomeCategories(values))
    }
    const dataCategories = useSelector(state => state?.categories?.incomeCategories)
    const arrayIconIncome = [0, 1, 2, 3, 4, 5]
    console.log(dataCategories)
    return <>
        <Categories addCategories={addIncomeCategoriesCallback} dataCategories={dataCategories} title={"income"} arrayIcon={arrayIconIncome}/>


    </>
}