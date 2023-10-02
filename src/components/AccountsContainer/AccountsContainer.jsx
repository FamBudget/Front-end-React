import React, {useState} from "react";
import {useSelector} from "react-redux";
import styles from './AccauntsContainer.module.scss'
import {Button} from "../../components";
import {Modal} from "@mui/material";
import {AddingAccount} from "../../components/AddingAccount/AddingAccount";
import {MovingAccounts} from "../../components/MovingAccounts/MovingAccounts";


export const AccountsContainer = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };




    const AccountsData = useSelector(state => state.accounts.data)
    return <>
        <div className={styles.wrapper}>
            <div className={styles.accounts}>
                <div className={styles.accountsHeader}>
                    <h2>Счета</h2>
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
                            <span className={styles.titleAccounts}>{t.name}</span></div>
                        <span>{t.amount} {t.currency} </span>
                    </div>)}

                </div>}
            </div>
            <MovingAccounts/>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div><AddingAccount setOpen={setOpen}/></div>
        </Modal>
    </>

};
