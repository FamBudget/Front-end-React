import React, {useEffect, useState} from "react";
import styles from './TableOperations.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {FiltersOperations, subtractMonths} from "../FIlterOperations/FiltersOperations";
import {TableOperations} from "./TableOperations";
import {fetchExpenses} from "../../redux/reducers/OperationsReducer";

let startDate = subtractMonths(new Date())
export const ExpenseTableContainer = () => {
    const [query, setQuery] = useState({
        endDate: new Date(),
        startDate,
        sort: 'DATE',
        sortDesc: false
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchExpenses(query))
    }, [])
    const getData = (values) => {
        dispatch(fetchExpenses(values))
    }
    const dataIncomes = useSelector(state => state?.operations?.expenses)

    return <div className={styles.moving}>
        <FiltersOperations query={query} setQuery={setQuery} getData={getData}/>
        <TableOperations getData={getData} data={dataIncomes} query={query} setQuery={setQuery} title={'expense'}/>
    </div>


};
