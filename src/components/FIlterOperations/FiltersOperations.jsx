import React, {forwardRef, useState} from "react";
import styles from './FiltersOperations.module.scss'
import DatePicker from "react-datepicker";
import {Button} from "../Button";

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

export function subtractMonths(date) {
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

export const FiltersOperations = ({query, setQuery, getData}) => {
        const [activeButton, setActiveButton] = useState(3)



        const setStartDate = (value) => {
            getData({...query, startDate: value})
            setQuery({...query, startDate: value})
        }
        const setEndDate = (value) => {
            getData({...query, endDate: value})
            setQuery({...query, endDate: value})

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
            getData({...query, startDate})
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
        return <div className={styles.filters}>
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


    }
;
