import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from './AccauntsSettings.module.scss'
import {Button} from "../Button";
import {
    addExpenseCategories,
    addIncomeCategories, deleteExpenseCategories, deleteIncomeCategories,
    editExpenseCategories,
    editIncomeCategories,
    fetchExpenseCategories,
    fetchIncomeCategories
} from "../../redux/reducers/CategoriesReducer";
import {EditCategories} from "../EditCategories/EditCategories";
import {AddingCategories} from "../AddingCategories/AddingCategories";
import {DeleteCategory} from "../DeleteСategory/DeleteCategory";

const arrayIconIncome = [0, 1, 2, 3, 4, 5]
const arrayIconExpense = [...Array(15).keys()]
export const CategorySettings = () => {

    const dispatch = useDispatch();

    const [activeButton, setActiveButton] = useState(0)


    useEffect(() => {
        dispatch(fetchIncomeCategories())
        dispatch(fetchExpenseCategories())
    }, [])
    let title = activeButton === 0 ? "expense" : "income"
    let arrayIcon = activeButton === 0 ? arrayIconExpense : arrayIconIncome
    const deleteCategoryCallback = (value) => {
        activeButton === 0 ? dispatch(deleteExpenseCategories(value)) : dispatch(deleteIncomeCategories(value))
    }
    const editCategories = (values) => {
        activeButton === 0 ? dispatch(editExpenseCategories(values)) : dispatch(editIncomeCategories(values))
    }
    const addCategories = (values) => {
        activeButton === 0 ? dispatch(addExpenseCategories(values)) : dispatch(addIncomeCategories(values))
    }
    const dataCategories = useSelector(state => activeButton ? state?.categories?.incomeCategories : state?.categories?.expenseCategories)
    return <>
        <div className={styles.wrapper}>
            <div className={styles.accounts}>
                <div className={styles.accountsHeader}>

                    <AddingCategories dataCategories={dataCategories} addCategories={addCategories}
                                      arrayIcon={arrayIcon} title={title}/>
                <div className={styles.rightButtons}>
                    <div onClick={() => setActiveButton(0)}><Button
                        className={activeButton === 0 ? styles.activeButton : styles.button}
                        text={"Расходы"}>
                    </Button></div>
                    <div onClick={() => setActiveButton(1)}><Button
                        className={activeButton === 1 ? styles.activeButton : styles.button} text={"Доходы"}>
                    </Button></div>
                </div>
            </div>
            {Array.isArray(dataCategories) && <div className={styles.List}>
                {dataCategories?.map(t => <div key={t.id} className={styles.categoryItem}>
                    <div className={styles.itemLeft}>
                        <svg>
                            <use href={`#${title}${t.iconNumber}`}/>
                        </svg>
                        <span className={styles.titleAccounts}>{t.name}</span>
                    </div>
                    <div className={styles.setWrap}>
                        <EditCategories dataCategories={t} editCategories={editCategories}
                                        arrayIcon={arrayIcon} title={title}/>

                           <DeleteCategory data={t} deleteCategory={deleteCategoryCallback}/></div>

                </div>)}

            </div>}
        </div></div>


    </>

};
