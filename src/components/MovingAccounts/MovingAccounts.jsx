import React, {forwardRef, useEffect, useState} from "react";
import styles from './MovingAccounts.module.scss'
import {ArrowDown} from "../../icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchMoving} from "../../redux/reducers/MovingReducer";
import DatePicker from "react-datepicker";
import {Button} from "../Button";

const sortList = [
    {
        id: 1,
        title: "Откуда",
        sortName: "ACCOUNT_FROM"
    },
    {
        id: 2,
        title: "Куда",
        sortName: "ACCOUNT_TO"
    },
    {
        id: 3,
        title: "Сумма",
        sortName: "AMOUNT"
    },
    {
        id: 4,
        title: "Дата",
        sortName: "DATE"
    },
]
const buttonFilter = [
    {
        id: 1,
        title: "За сутки"
    },
    {
        id: 2,
        title: "Неделю"
    },
    {
        id: 3,
        title: "Месяц"
    },

]


function subtractMonths(date) {
    date.setMonth(date.getMonth() - 1);
    return date;
}

function subtractWeek(date) {
    date.setDate(date.getDate() - 7);
    return date;
}

function subtractDay(date) {
    date.setDate(date.getDate() - 1);
    return date;
}

export const MovingAccounts = () => {
    const [activeButton, setActiveButton] = useState(3)
    const [query, setQuery] = useState({
        endDate: new Date(),
        startDate: subtractMonths(new Date()),
        sort: 'DATE',
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchMoving(query))
    }, [])
    const sorts = (sortName) => {
        setQuery({...query, sort: sortName})
        dispatch(fetchMoving({...query, sort: sortName}))
    }

    const setStartDate = (value) => {
        setQuery({...query, startDate: value})
        dispatch(fetchMoving({...query, startDate: value}))
    }
    const setEndDate = (value) => {
        setQuery({...query, endDate: value})
        dispatch(fetchMoving({...query, endDate: value}))

    }
    const filterDate = (id) => {
        setActiveButton(id)
        let date = new Date()
        let startDate
        if (id === 1) {
            startDate = subtractDay(date);
        } else if (id === 2) {
            startDate = subtractWeek(date);

        } else if (id === 3) {
            startDate = subtractMonths(date);
        }
        dispatch(fetchMoving({...query, startDate}))
        setQuery({...query, startDate})
    }
    // eslint-disable-next-line react/display-name
    const ExampleCustomInput = forwardRef(({value, onClick}, ref) => (
        <div className={styles.filterDate} onClick={onClick} ref={ref}>
            {value}
            <svg>
                <use href="#calendar"/>
            </svg>
        </div>
    ));
    const dataMoving = useSelector(state => state?.moving?.data)


    return <div className={styles.moving}>
        <div className={styles.filters}>
            <div className={styles.wrapperDatepicker}>
                <DatePicker
                    selected={query.startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={query.startDate}
                    endDate={query.endDate}
                    dateFormat="MMMM d"
                    customInput={<ExampleCustomInput/>}
                />
                <div className={styles.dush}>&#8212;</div>
                <DatePicker
                    selected={query.endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={query.startDate}
                    endDate={query.endDate}
                    minDate={query.startDate}
                    dateFormat="MMMM d"
                    customInput={<ExampleCustomInput/>}

                />
            </div>
            <div className={styles.buttons}>{buttonFilter.map(t => <div key={t.id} onClick={() => filterDate(t.id)}>
                <Button text={t.title}
                        className={activeButton === t.id ? `${styles.filterButton} ${styles.activeButton}` : styles.filterButton}/>
            </div>)}</div>
        </div>
        <div className={styles.tableContainer}>
            <div className={styles.rowHeader}>
                {sortList.map(t => <div key={t.id} className={styles.itemHeader}
                                        onClick={() => sorts(t.sortName)}>{t.title} <ArrowDown
                    className={styles.arrow}/>
                </div>)}
            </div>
            <div className={styles.bodyTable}>
                {Array.isArray(dataMoving) && dataMoving?.map(t => <div key={t.id} className={styles.row}>
                    <div className={styles.item}>{t.accountFrom.name}</div>
                    <div className={styles.item}>{t.accountTo.name}</div>
                    <div className={styles.item}>{t.amount}{t.accountFrom.currency}</div>
                    <div className={styles.item}>{t.createdOn.split(' ')[0]}</div>
                </div>)}
            </div>
        </div>
    </div>


};
