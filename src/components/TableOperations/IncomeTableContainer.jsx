import React, {useEffect, useState} from "react";
import styles from './TableOperations.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchMoving} from "../../redux/reducers/MovingReducer";
import {FiltersOperations, subtractMonths} from "../FIlterOperations/FiltersOperations";
import {TableOperations} from "./TableOperations";
import {fetchIncomes} from "../../redux/reducers/OperationsReducer";

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
    const dataIncomes = useSelector(state => state?.operations?.incomes)

    return <div className={styles.moving}>
        <FiltersOperations query={query} setQuery={setQuery} getData={getData}/>
        <TableOperations getData={getData} data={dataIncomes} query={query} setQuery={setQuery}/>
    </div>


};
