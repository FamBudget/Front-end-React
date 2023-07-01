import React, {useEffect, useState} from "react";
import styles from './TableOperations.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchMoving} from "../../redux/reducers/MovingReducer";
import {FiltersOperations, subtractMonths} from "../FIlterOperations/FiltersOperations";
import {TableOperations} from "./TableOperations";

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
    }, [])
const getData  = (values) => {
    dispatch(fetchMoving({...query, values}))
}
    const data = useSelector(state => state?.moving?.data)

    return <div className={styles.moving}>
        <FiltersOperations query={query} setQuery={setQuery}/>
        <TableOperations getData={getData} data={data} query={query} setQuery={setQuery}/>
    </div>


};
