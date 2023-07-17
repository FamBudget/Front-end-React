import React, {useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import styles from "./CopyOperation.module.scss";
import {Modal} from "@mui/material";
import {Button} from "../Button";
import {DatePickerField} from "../DatePickerFields";
import {newDate, subtractHours} from "../AddingAccount";
import {useSelector} from "react-redux";


export const CopyOperation = ({title, data,  addOperation}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const forgetPasswordRef = useRef();
    const dispatchData = (values) => {
        addOperation({...values, createdOn: subtractHours(values.createdOn)})

    }
    let dataAccounts;
    let dataCategories;
    if (title === 'expense') {
        dataAccounts = useSelector(state => state.accounts.data)
        dataCategories = useSelector(state => state?.categories?.expenseCategories)
    } else {
        dataAccounts = useSelector(state => state.accounts.data)
        dataCategories = useSelector(state => state?.categories?.incomeCategories)

    }
    console.log(data)
    return (
        <>
           <div className={styles.icon}><svg onClick={handleOpen}>
               <use href={`#copy`}/>
           </svg></div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div>
                    {dataAccounts && dataCategories && <div className={styles.wrapper}>
                        <Formik
                            initialValues={{
                                accountId: data.account.id,
                                amount: data.amount,
                                categoryId: data.category.id,
                                createdOn: newDate,
                                description: "",
                                id: 1
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                dispatchData(values)
                                setSubmitting(false);
                                setOpen(false)

                            }}
                        >
                            {({isSubmitting}) => (
                                <Form ref={forgetPasswordRef} className={styles.form}>
                                    <div className={styles.header}>
                                        <h2>{title === 'expense' ? 'Добавить расход' : "Добавить доход"}</h2>
                                    </div>
                                    <label>Сумма</label>
                                    <div className={styles.row}><Field
                                        type="text"
                                        name="amount"
                                        placeholder="0"
                                    />
                                        <span>{dataAccounts[0]?.currency}</span>
                                    </div>
                                    <label>Категория</label>
                                    <Field name="categoryId" as="select">
                                        <option disabled value="">Выберите категорию</option>

                                        {dataCategories?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </Field>
                                    <label>Счет</label>
                                    <Field name="accountId" as="select">
                                        <option disabled value="">Выберите счет</option>

                                        {dataAccounts?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </Field>
                                    <label>{title === "expense" ? "Дата дохода" : "Дата расхода"}</label>
                                    <DatePickerField name="createdOn"/>
                                    <label>Комментарий</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        className={styles.comment}
                                        placeholder="Введите комменатрий"
                                    />
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
                    </div>}
                </div>
            </Modal>

        </>
    );
};
