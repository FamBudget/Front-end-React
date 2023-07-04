import React, {useState} from 'react'
import {Modal} from "@mui/material";
import styles from "./AddingAccount.module.scss";
import {useFormikContext} from "formik";
import {Button} from "../Button";



export const SelectIcon = ({iconNumber, arrayIcon, title}) => {
    const {setFieldValue} = useFormikContext();
    const [open, setOpen] = useState(false);
    const [numberIcon, setNumberIcon] = useState(iconNumber)
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
            <use href={`#${title}${iconNumber}`}/>
        </svg>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <div className={styles.selectContainer}><h3>Выберите иконку</h3>
                <div className={styles.icons}>{arrayIcon.map(t => <svg key={t}
                                                                   className={numberIcon === t ? styles.activeIcon : ''}
                                                                   onClick={() => setNumberIcon(t)}>
                    <use href={`#${title}${t}`}/>
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
