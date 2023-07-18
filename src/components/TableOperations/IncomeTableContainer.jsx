import React, {useEffect, useState} from "react";
import styles from './TableOperations.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchMoving} from "../../redux/reducers/MovingReducer";
import {FiltersOperations, subtractMonths} from "../FIlterOperations/FiltersOperations";
import {TableOperations} from "./TableOperations";
import {addIncome, fetchIncomes, updateIncome} from "../../redux/reducers/OperationsReducer";

let startDate = subtractMonths(new Date())
export const IncomeTableContainer = () => {
    const [query, setQuery] = useState({
        endDate: new Date(),
        startDate,
        sort: 'DATE',
        sortDesc: false
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchMoving(query))
        dispatch(fetchIncomes(query))
    }, [])
    const getData = (values) => {
        dispatch(fetchMoving(values))
    }
    const addIncomeCallback = (values) => {
        dispatch(addIncome(values))
    }
    const changeIncomeCallback = (values) => {
        dispatch(updateIncome(values))
    }
    const dataIncomes = useSelector(state => state?.operations?.incomes)

    return <div className={styles.moving}>
        <FiltersOperations query={query} setQuery={setQuery} getData={getData}/>
        <TableOperations changeOperation={changeIncomeCallback} getData={getData} addOperation={addIncomeCallback} data={dataIncomes} query={query} setQuery={setQuery} title={'income'}/>
    </div>


};
