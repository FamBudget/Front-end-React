import React, {useState} from "react";
import styles from "./DeleteCategory.module.scss";
import {Modal} from "@mui/material";
import {Button} from "../Button";


export const DeleteCategory= ({data, deleteCategory}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submitDelete = () => {
        deleteCategory(data.id)
        setOpen(false)
    }
    return (
        <>
            <div className={styles.icon}>
                <svg onClick={handleOpen}>
                    <use href={`#delete`}/>
                </svg>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div>
                    {data && <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <h2>Вы уверены, что хотите
                                удалить категорию расхода?</h2>
                            <h3> Вместе с ней из истории будут удалены
                                все проведенные операции</h3>

                        </div>

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
                                    onClick={submitDelete}
                                    type="submit"
                                    text="Ок"
                                />
                            </div>
                        </div>
                    </div>}
                </div>
            </Modal>

        </>
    );
};
