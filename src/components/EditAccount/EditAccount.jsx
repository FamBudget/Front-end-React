import React, {useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import styles from "./EditAccount.module.scss";
import {Button} from "../../components";
import {DatePickerField} from "../DatePickerFields/DatePickerFileds";
import {SelectIcon} from "../AddingAccount/SelectIcon";
import {Modal} from "@mui/material";


const arrayIcon = [0, 1, 2, 3, 4, 5]
export const EditAccount = ({data, editAccount}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const forgetPasswordRef = useRef();
    const dispatch = useDispatch()

    const currency = useSelector(state => state.accounts?.data[0]?.currency)

    const dispatchData = (values) => {
        dispatch(editAccount(values))
    }
    return (
        <>
            <div className={styles.icon}>
                <svg onClick={handleOpen}>
                    <use href={`#edit`}/>
                </svg>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className={styles.wrapper}>
                    <Formik
                        initialValues={{
                            createdOn: data.createdOn,
                            currency: currency,
                            id: data.id,
                            iconNumber: data.iconNumber,
                            name: data.name,
                            startAmount: data.amount
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            dispatchData(values)
                            setSubmitting(false);
                            setOpen(false)

                        }}
                    >
                        {({isSubmitting, errors, values}) => (
                            <Form ref={forgetPasswordRef} className={styles.form}>
                                <div className={styles.header}>
                                    <h2>Редактировать</h2>
                                    <SelectIcon
                                        iconNumber={values.iconNumber} arrayIcon={arrayIcon}/>
                                </div>
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
            </Modal>

        </>
    );
};
