import React, {useRef} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import styles from "./AddingAccount.module.scss";
import './styles.css'
import {Button} from "../../components";
import {DatePickerField, formatDate} from "../DatePickerFields/DatePickerFileds";
import {addAccount} from "../../redux/reducers/AccountsReducer";


export const AddingAccount = ({setOpen}) => {
    const forgetPasswordRef = useRef();
    const currency = useSelector(state => state.Accounts.data[0].currency)
    var newDate = formatDate(new Date())
    const dispatch= useDispatch()
    return (
        <>
            <div className={styles.wrapper}>
                <Formik
                    initialValues={{
                        createdOn: newDate,
                        currency: currency,
                        iconNumber: 0,
                        name: '',
                        startAmount: null
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        dispatch(addAccount(values))
                        setSubmitting(false);
                        setOpen(false)
                    }}
                >
                    {({isSubmitting, errors}) => (
                        <Form ref={forgetPasswordRef} className={styles.form}>
                            <h2>Добавить счет</h2>
                            <label>Название счета</label>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Наличные"
                            />
                            {errors.password && <p>{errors.password}</p>}
                            <label>Валюта счета</label>
                            <Field
                                type="text"
                                name="currency"
                                default={currency}
                                disabled={true}
                            />
                            <label>Начальный остаток</label>
                            <div className={styles.row}><Field
                                type="text"
                                name="startAmount"
                                placeholder="0"
                            />
                                <span>{currency}</span>
                            </div>
                            <label>Дата начального остатка</label>
                            <DatePickerField name="createdOn" />




                            <Button
                                className={styles.registrButton}
                                isSubmitting={isSubmitting}
                                type="submit"
                                text="Восстановить пароль"
                            />
                        </Form>
                    )}
                </Formik>
            </div>

        </>
    );
};
