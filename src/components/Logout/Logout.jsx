import React, {useState} from "react";
import styles from "./Logout.module.scss";
import {Modal} from "@mui/material";
import {Button} from "../Button";
import {setAuth} from "../../redux/reducers/AuthReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


export const Logout= () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submit = () => {
        dispatch(setAuth(null));
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <div className={styles.icon}>
                <svg onClick={handleOpen}>
                    <use href={`#exit`}/>
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
                                    onClick={submit}
                                    type="submit"
                                    text="Ок"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    );
};
