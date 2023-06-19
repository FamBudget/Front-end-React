import React, {useRef} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import styles from "./AddingAccount.module.scss";
import {Button} from "../../components";
import {DatePickerField, formatDate} from "../DatePickerFields/DatePickerFileds";
import {addAccount} from "../../redux/reducers/AccountsReducer";
import {SelectIcon} from "./SelectIcon";

const hours = new Date().getTimezoneOffset() / 60

export function subtractHours(date) {
    date.setHours(date.getHours() + hours);
    return formatDate(date);
}

export const AddingAccount = ({setOpen}) => {
    const forgetPasswordRef = useRef();
    const dispatch = useDispatch()

    const currency = useSelector(state => state.Accounts?.data[0]?.currency)
    var newDate = new Date()

    const dispatchData = (values) => {
        const changedValues = {...values, createdOn: subtractHours(values.createdOn)}
        dispatch(addAccount(changedValues))

    }
    return (
        <>
            <div className={styles.wrapper}>
                <Formik
                    initialValues={{
                        createdOn: newDate,
                        currency: currency,
                        iconNumber: 0,
                        name: '',
                        startAmount: ''
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        dispatchData(values)
                        setSubmitting(false);
                        setOpen(false)

                    }}
                >
                    {({isSubmitting, errors, values}) => (
                        <Form ref={forgetPasswordRef} className={styles.form}>
                            <div className={styles.header}><h2>Добавить счет</h2><SelectIcon
                                iconNumber={values.iconNumber}/></div>
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
                            <DatePickerField name="createdOn"/>


                            <div className={styles.buttons}>
                                <div className={styles.WrapBtn} onClick={() => setOpen(false)}>
                                    <Button
                                        className={styles.cancelButton}
                                        text="Отмена"
                                    />
                                </div>
                                <div className={styles.WrapBtn}>
                                    <Button
                                        className={styles.submitButton}
                                        isSubmitting={isSubmitting}
                                        type="submit"
                                        text="Ок"
                                    />
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>

        </>
    );
};
