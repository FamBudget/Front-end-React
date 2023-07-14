import React from 'react'
import styles from './Categories.module.scss'
import {AddingCategories} from "../AddingCategories/AddingCategories";


export const Categories = ({dataCategories, arrayIcon, title, addCategories}) => {
console.log(dataCategories)
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
                <span>{t.amount} {t.currency} </span>
            </div>)}

        </div>}
    </div>
}