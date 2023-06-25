import React, {useState} from 'react'
import {Modal} from "@mui/material";
import styles from "./AddingAccount.module.scss";
import {useFormikContext} from "formik";
import {Button} from "../Button";

const array = [ 0, 1, 2, 3, 4, 5]

export const SelectIcon = ({iconNumber}) => {
    const {setFieldValue} = useFormikContext();
    const [open, setOpen] = React.useState(false);
    const [numberIcon, setNumberIcon] = useState(0)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submitSelect = () => {
        setFieldValue('iconNumber', numberIcon)
        handleClose()
    }

    return <div>

        <svg onClick={() => handleOpen()}>
            <use href={`#${iconNumber}`}/>
        </svg>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <div className={styles.selectContainer}><h3>Выберите иконку</h3>
                <div className={styles.icons}>{array.map(t => <svg key={t}
                                                                   className={numberIcon === t ? styles.activeIcon : ''}
                                                                   onClick={() => setNumberIcon(t)}>
                    <use href={`#${t}`}/>
                </svg>)}</div>
                <div className={styles.buttons}>
                    <div className={styles.WrapBtn} onClick={() => setOpen(false)}><Button
                        className={styles.cancelButton}
                        text="Отмена"
                    />
                    </div>
                    <div className={styles.WrapBtn} onClick={submitSelect}><Button
                        className={styles.submitButton}
                        text="Ок"
                    /></div></div>
            </div>
        </Modal>

    </div>

}
