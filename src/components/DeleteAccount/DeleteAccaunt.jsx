import React, {useState} from "react";
import styles from "./DeleteAccaunt.module.scss";
import {Modal} from "@mui/material";
import {Button} from "../Button";


export const DeleteAccaunt= ({data, deleteAccount}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submitDelete = () => {
        deleteAccount(data.id)
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
                            <h2>Вы уверены, что
                                хотите удалить счет?</h2>
                            <h3> Вместе с текущим счетом будут удалены
                                все связанные данные:</h3>
                            <ul>
                                <li>·Доходы</li>
                                <li>·Расходы</li>
                                <li>·Переводы</li>
                            </ul>
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
