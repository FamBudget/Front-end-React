import React, {useState} from 'react'
import {Modal} from "@mui/material";
import {Button} from "../Button";
import styles from "./SettingsMenu.module.scss";


export const DeleteUser = ({deleteUser}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submitSelect = () => {
        deleteUser()
        handleClose()
    }

    return <div>

        <Button
            onClick={() => handleOpen()}
            className={styles.deleteButton}
            text="Удалить аккаунт"
        />
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <div className={styles.selectContainer}><h3>Подтверждение удаление
                вашего аккаунта</h3>
                <h4>После удаление аккаунта, у вас не будет возможности восстановить его</h4>
                <div className={styles.WrapBtn}>
                    <div onClick={() => setOpen(false)}><Button
                        className={styles.deleteButton}
                        text="Отмена"
                    />
                    </div>
                    <div onClick={submitSelect}><Button
                        className={styles.EditButton}
                        text="Подтвердить"
                    /></div>
                </div>
            </div>
        </Modal>

    </div>

}
