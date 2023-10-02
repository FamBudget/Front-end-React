import React, {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import * as yup from "yup";

import styles from "./Movings.module.scss";

import {Arrow} from "../../icons";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../Button";
import {DatePickerField} from "../DatePickerFields";
import {subtractHours} from "../AddingAccount";
import {subtractMonths} from "../FIlterOperations/FiltersOperations";
import {subtractDay, subtractWeek} from "../MovingAccounts";
import {addMoving, fetchMoving} from "../../redux/reducers/MovingReducer";

const FormSchema = yup.object().shape({
    amount: yup
        .string()
        .matches(/\d+/, "Неверный формат")
        .required("Обязательное поле"),
});


export const Movings = ({operations, setActive, active}) => {
    const currency = useSelector((state) => state.accounts?.data[0]?.currency);
    const accounts = useSelector((state) => state.accounts.data);
    const operationsArray = useSelector((state) => state.moving.data);

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
        dispatch(addMoving(changedValues));
    };
    useEffect(() => {
        dispatch(fetchMoving(query))
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


        dispatch(fetchMoving({...query, startDate}));
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
console.log(sorted)
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperForm}>
                <div className={styles.title}>
                    <h3>Перемещения</h3><label id="lab"><Arrow operation={'movings'}/></label>
                    <select  onChange={(e) => setActive(e.target.value)} value={active} >
                        {operations.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>

                </div>
                { accounts && <Formik
                    initialValues={{
                        accountFromId: accounts[0]?.id,
                        accountToId: accounts[0]?.id,
                        amount: 0,
                        createdOn: newDate,
                        description: "",
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
                            <label>Счета</label>
                            <Field name="accountFromId" as="select">
                                <option disabled value="">Счет списания</option>

                                {accounts?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </Field>
                            <Field name="accountToId" as="select">
                                <option disabled value="">Счет зачисления</option>

                                {accounts?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </Field>
                            <label>Дата перевода</label>
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
                                text="Совершить перевод"
                            />
                        </form>
                    )}
                </Formik>}
            </div>
            <div className={styles.wrapperStats}>
                <div className={styles.titleBlock}>
                    <h3>Сумма переводов</h3>
                    <select onChange={handleChange} value={selected}>
                        {options.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.text}
                            </option>
                        ))}
                    </select>
                </div>


                <div className={styles.devideLine}></div>
                <div className={styles.tableOperations}>
                    {Object.keys(sorted).map(t => <div key={t.key}><span>{t}</span>
                        <div className={styles.dayTable}>
                            {sorted[t].map(y => <div key={y.key} className={styles.rowTable}>
                                <div className={styles.left}>
                                    <svg>
                                        <use href={`#${y.accountFrom.iconNumber}`}/>
                                    </svg>
                                    <span>{y.accountFrom.name}</span>
                                    <svg>
                                        <use href={`#arrow`}/>
                                    </svg>
                                    <svg>
                                        <use href={`#${y.accountTo.iconNumber}`}/>
                                    </svg>
                                    <span>{y.accountTo.name}</span>
                                 </div>

                                <span></span>
                                <span className={styles.amount}>{y.amount} {currency}</span></div>)}</div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};
