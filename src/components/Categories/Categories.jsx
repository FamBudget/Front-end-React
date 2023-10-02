import React from 'react'
import styles from './Categories.module.scss'
import {AddingCategories} from "../AddingCategories/AddingCategories";


export const Categories = ({dataCategories, arrayIcon, title, addCategories, amountTransactions, iconCurrency}) => {

    return <div className={styles.table}>
        <div className={styles.Header}>
            <h2>Категории</h2>
            <AddingCategories dataCategories={dataCategories} addCategories={addCategories} arrayIcon={arrayIcon} title={title}/>

        </div>
        {Array.isArray(dataCategories) && <div className={styles.tableList}>
            {dataCategories?.map(t => <div key={t.id} className={styles.Item}>
                <div className={styles.itemLeft}>
                    <svg>
                        <use href={`#${title}${t.iconNumber}`}/>
                    </svg>
                    <span className={styles.title}>{t.name}</span></div>
                <span style={title === 'expense' ? {color: '#FF3A3A'} : {color: '#1B9B85'}} className={styles.amount}> {title === 'expense' ? '-' : '+'} {amountTransactions[t.id] || 0} {iconCurrency} </span>
            </div>)}

        </div>}
    </div>
}