import React, {useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import styles from "./EditCategories.module.scss";
import {Modal} from "@mui/material";
import {Button} from "../Button";
import {SelectIcon} from "../AddingAccount/SelectIcon";



export const EditCategories = ({arrayIcon, title, editCategories, dataCategories}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const forgetPasswordRef = useRef();


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
                <div>
                    <div className={styles.wrapper}>
                        <Formik
                            initialValues={{
                                iconNumber: dataCategories?.iconNumber,
                                id: dataCategories?.id,
                                name: dataCategories?.name,
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                editCategories(values)
                                setSubmitting(false);
                                setOpen(false)

                            }}
                        >
                            {({isSubmitting, values, errors, touched}) => (
                                <Form ref={forgetPasswordRef} className={styles.form}>
                                    <div className={styles.header}>
                                        <h2>Редактировать</h2>
                                        <SelectIcon
                                            iconNumber={values.iconNumber} arrayIcon={arrayIcon} title={title}/>
                                    </div>
                                    <label>Название категории</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Введите название категории"
                                    />
                                    {errors.name && touched.name && <div className={styles.error}>{errors.name}</div>}

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
                </div>
            </Modal>

        </>
    );
};
