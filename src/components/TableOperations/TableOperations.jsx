import React from "react";
import styles from './TableOperations.module.scss'
import {ArrowDown} from "../../icons";
import {CopyOperation} from "../CopyOperation/CopyOperation";
import {ChangeOperation} from "../ChangeOperation/ChangeOperation";
import {DeleteOperation} from "../DeleteOperation/DeleteOperation";

const sortList = [
    {
        id: 1,
        title: "Дата",
        sortName: "DATE"
    },
    {
        id: 2,
        title: "Сумма",
        sortName: "AMOUNT"
    },
    {
        id: 3,
        title: "Счет",
        sortName: "ACCOUNT"
    },
]

export const TableOperations = ({getData, data, query, setQuery, title, addOperation, changeOperation, deleteOperation}) => {

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
    switch (data[0] && data[0]?.account?.currency) {
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
                <div className={styles.itemHeader}>Категория</div>
                {sortList.map(t => <div key={t.id} className={styles.itemHeader}
                                        onClick={() => sorts(t.sortName)}>{t.title} <ArrowDown
                    className={styles.arrow}/>
                </div>)}
            </div>
            <div className={styles.bodyTable}>
                {Array.isArray(data) && data?.map(t => <div key={t.id} className={styles.row}>
                    <div className={styles.item}>
                        <svg className={styles.iconCategory}>
                            <use href={`#${title}${t.category.iconNumber}`}/>
                        </svg>
                        {t.category.name}</div>
                    <div className={styles.item}>{t.createdOn.split(' ')[0]}</div>
                    <div style={title === 'expense' ? {color: '#FF3A3A'} : {color: '#1B9B85'}} className={styles.item}>{title === 'expense' ? '-' : '+'}{t.amount}{iconCurrency}</div>
                    <div className={styles.itemLast}>{t.account.name}
                        <div className={styles.modals}>
                            <CopyOperation title={title} addOperation={addOperation} data={t}/>
                            <ChangeOperation title={title} changeOperation={changeOperation} data={t}/>
                            <DeleteOperation deleteOperation={deleteOperation} data={t}/>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </div>


};
