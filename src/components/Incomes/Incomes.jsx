import React, {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import * as yup from "yup";

import styles from "./Incomes.module.scss";

import {ExpensesArrow} from "../../icons";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../Button";
import {DatePickerField} from "../DatePickerFields";
import {fetchAccounts} from "../../redux/reducers/AccountsReducer";
import {addIncome, fetchIncomes,} from "../../redux/reducers/OperationsReducer";
import {fetchIncomeCategories} from "../../redux/reducers/CategoriesReducer";
import {subtractHours} from "../AddingAccount";
import {Diagram} from "../Diagram";
import {subtractMonths} from "../FIlterOperations/FiltersOperations";
import {subtractDay, subtractWeek} from "../MovingAccounts";

const FormSchema = yup.object().shape({
    amount: yup
        .string()
        .matches(/\d+/, "Неверный формат")
        .required("Обязательное поле"),
});


export const Incomes = ({operations, setActive, active}) => {
    const currency = useSelector((state) => state.accounts?.data[0]?.currency);
    const accounts = useSelector((state) => state.accounts.data);
    const operationsArray = useSelector((state) => state.operations.incomes);
    const expenseCategories = useSelector(
        (state) => state?.categories?.incomeCategories
    );
    const dispatch = useDispatch();
    const options = [
        {value: 1, text: "За день"},
        {value: 2, text: "За неделю"},
        {value: 3, text: "За месяц"},
    ];

    const [selected, setSelected] = useState(options[1].value);
    const [query, setQuery] = useState({
        endDate: new Date(),
        startDate: subtractWeek(new Date()),
        sort: "DATE",
        sortDesc: false,
    });

    var newDate = new Date();

    const dispatchData = (values) => {
        const changedValues = {
            ...values,
            createdOn: subtractHours(values.createdOn),
        };
        dispatch(addIncome(changedValues));
    };
    useEffect(() => {
        dispatch(fetchAccounts());
        dispatch(fetchIncomeCategories());
        dispatch(fetchIncomes(query));
    }, []);

    const handleChange = (e) => {
        setSelected(e.target.value);
        let date = new Date();
        let startDate;
        if (e.target.value == 1) {
            startDate = subtractDay(date);
        } else if (e.target.value == 2) {
            startDate = subtractWeek(date);
        } else if (e.target.value == 3) {
            startDate = subtractMonths(date);
        }


        dispatch(fetchIncomes({...query, startDate}));
        setQuery({...query, startDate});
    };

    let sorted = []

    let sortedOperations = [...operationsArray]
    sortedOperations?.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
    for (let i = 0; i < sortedOperations.length; i++) {
        if (sortedOperations[i].createdOn) {
            if (Array.isArray(sorted[sortedOperations[i]?.createdOn.split(' ')[0]])) {
                sorted[sortedOperations[i]?.createdOn.split(' ')[0]].push(sortedOperations[i])
            } else {
                sorted[sortedOperations[i]?.createdOn.split(' ')[0]] = []
                sorted[sortedOperations[i]?.createdOn.split(' ')[0]].push(sortedOperations[i])
            }

        }

    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperForm}>
                <div className={styles.title}>
                    <h3>Доходы</h3><label id="lab"><ExpensesArrow/></label>
                    <select id='s' onChange={(e) => setActive(e.target.value)} value={active} >
                        {operations.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>

                </div>
                {expenseCategories && operationsArray && accounts && <Formik
                    initialValues={{
                        accountId: accounts[0]?.id,
                        amount: 0,
                        categoryId: expenseCategories[0]?.id,
                        createdOn: newDate,
                        description: "",
                        id: 1
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        dispatchData(values);
                        setSubmitting(false);
                    }}
                    validationSchema={FormSchema}
                >
                    {({handleSubmit, isSubmitting, errors}) => (
                        <form onSubmit={handleSubmit}>
                            <label>Сумма</label>
                            <div className={styles.row}><Field
                                type="text"
                                name="amount"
                                placeholder="0"
                            />
                                <span>{currency}</span>
                            </div>
                            {errors.amount && <p>{errors.amount}</p>}
                            <label>Категория</label>
                            <Field name="categoryId" as="select">
                                <option disabled value="">Выберите категорию</option>

                                {expenseCategories?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </Field>
                            <label>Счет</label>
                            <Field name="accountId" as="select">
                                <option disabled value="">Выберите счет</option>

                                {accounts?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </Field>
                            <label>Дата дохода</label>
                            <DatePickerField name="createdOn"/>
                            <label>Комментарий</label>
                            <Field
                                placeholder="Введите комментарий..."
                                className={styles.comment}
                                name="description"
                                as="textarea"
                            />
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                text="Ввести доход"
                            />
                        </form>
                    )}
                </Formik>}
            </div>
            <div className={styles.wrapperStats}>
                <div className={styles.titleBlock}>
                    <h3>Сумма доходов</h3>
                    <select onChange={handleChange} value={selected}>
                        {options.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.text}
                            </option>
                        ))}
                    </select>
                </div>

                {operationsArray && currency && <Diagram
                    incomes={true}
                    currency={currency}
                    operation={operationsArray}
                    expensesCategories={expenseCategories}
                    selected={options[selected - 1].text}
                />}
                <div className={styles.devideLine}></div>
                <div className={styles.tableOperations}>
                    {Object.keys(sorted).map(t => <div key={t.key}><span>{t}</span>
                        <div className={styles.dayTable}>
                            {sorted[t].map(y => <div key={y.key} className={styles.rowTable}>
                                <div className={styles.left}>
                                    <svg className={styles.iconCategory}>
                                        <use href={`#expense${y.category.iconNumber}`}/>
                                    </svg>
                                    {y.category.name}</div>
                                <span>{y.account.name}</span>
                                <span className={styles.amount}>+{y.amount} {currency}</span></div>)}</div>
                    </div>)}
                </div>

            </div>
        </div>
    );
};
