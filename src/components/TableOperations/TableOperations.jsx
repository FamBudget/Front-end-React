import React from "react";
import styles from './TableOperations.module.scss'
import {ArrowDown} from "../../icons";

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

export const TableOperations = ({getData, data, query, setQuery}) => {


    const sorts = (sortName) => {

        if (sortName === query.sort && !query.sortDesc) {
            getData({...query, sortDesc: true})
            setQuery({...query, sortDesc: true})

        } else if (sortName === query.sort && query.sortDesc) {
            getData({...query, sortDesc: false})
            setQuery({...query, sortDesc: false})

        } else {
            getData({...query, sort: sortName, sortDesc: false})
            setQuery({...query, sort: sortName, sortDesc: false})
        }
    }
    let iconCurrency;
    switch (data[0] && data[0]?.accountFrom?.currency) {
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
    return <div className={styles.moving}>
        <div className={styles.tableContainer}>
            <div className={styles.rowHeader}>
                {sortList.map(t => <div key={t.id} className={styles.itemHeader}
                                        onClick={() => sorts(t.sortName)}>{t.title} <ArrowDown
                    className={styles.arrow}/>
                </div>)}
            </div>
            <div className={styles.bodyTable}>
                {Array.isArray(data) && data?.map(t => <div key={t.id} className={styles.row}>
                    <div className={styles.item}>{t.accountFrom.name}</div>
                    <div className={styles.item}>{t.accountTo.name}</div>
                    <div className={styles.item}>{t.amount}{iconCurrency}</div>
                    <div className={styles.item}>{t.createdOn.split(' ')[0]}</div>
                </div>)}
            </div>
        </div>
    </div>


};
