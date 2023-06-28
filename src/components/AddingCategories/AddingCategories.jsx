import React, {useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import styles from "./AddingCategories.module.scss";
import {Modal} from "@mui/material";
import {Button} from "../Button";
import {SelectIcon} from "../AddingAccount/SelectIcon";



export const AddingCategories = ({arrayIcon, title, addCategories}) => {
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
            <Button className={styles.categoriesButton} handleOpen={handleOpen} text={"Добавить категорию"}>
                <svg>
                    <use href="#PlusGreen"/>
                </svg>
            </Button>
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
                                iconNumber: 0,
                                name: '',
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                addCategories(values)
                                setSubmitting(false);
                                setOpen(false)

                            }}
                        >
                            {({isSubmitting, values}) => (
                                <Form ref={forgetPasswordRef} className={styles.form}>
                                    <div className={styles.header}>
                                        <h2>Добавить категорию</h2>
                                        <SelectIcon
                                            iconNumber={values.iconNumber} arrayIcon={arrayIcon} title={title}/>
                                    </div>
                                    <label>Название категории</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Введите название категории"
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
                    </div>
                </div>
            </Modal>

        </>
    );
};
