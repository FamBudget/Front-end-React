import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from './AccauntsSettings.module.scss'
import {delAccount, deleteAccount, editAccount, fetchAccounts} from "../../redux/reducers/AccountsReducer";
import {Modal} from "@mui/material";
import {Button} from "../Button";
import {AddingAccount} from "../AddingAccount";
import {DeleteAccaunt} from "../DeleteAccount/DeleteAccaunt";
import {EditAccount} from "../EditAccount";


export const AccountsSettings = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchAccounts())
    }, [])

    const deleteAccountCallback = (value) => {
        dispatch(deleteAccount(value)).then(() => dispatch(delAccount(value)))
    }
    const editAccountCallback = (values) => {
        dispatch(editAccount(values))
    }
    const AccountsData = useSelector(state => state.accounts.data)
    return <>
        <div className={styles.wrapper}>
            <div className={styles.accounts}>
                <div className={styles.accountsHeader}>
                    <Button className={styles.accountsButton} onClick={handleOpen} text={"Добавить счёт"}>
                        <svg>
                            <use href="#plus"/>
                        </svg>
                    </Button>
                </div>
                {Array.isArray(AccountsData) && <div className={styles.tableList}>
                    {AccountsData?.map(t => <div key={t.id} className={styles.AccountsItem}>
                        <div className={styles.itemLeft}>
                            <svg>
                                <use href={`#${t.iconNumber}`}/>
                            </svg>
                            <span className={styles.titleAccounts}>{t.name}</span>
                        </div>
                        <div className={styles.setWrap}>
                            <EditAccount data={t} editAccount={editAccountCallback}/>
                            <DeleteAccaunt data={t} deleteAccount={deleteAccountCallback}/></div>
                    </div>)}

                </div>}
            </div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div>
                <AddingAccount setOpen={setOpen}/></div>
        </Modal>
    </>

};
