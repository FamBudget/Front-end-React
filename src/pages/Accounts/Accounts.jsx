import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {setAuth} from "../../redux/reducers/AuthReducer";
import styles from './Accaunts.module.scss'
import {Button} from "../../components";
import {fetchAccounts} from "../../redux/reducers/AccountsReducer";


export const Accounts = () => {
    const isAuth = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setAuth(null));
        localStorage.clear()
    };
    useEffect(() => {
        dispatch(fetchAccounts())
    }, [])
    const AccountsData = useSelector(state => state.Accounts.data)
    if(AccountsData.message === 'User not authorized') {
        logout()
    }

    return !isAuth ? (
        <Navigate to="/login"/>
    ) : (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Счета</h1>
                <button
                    style={{width: 50, height: 30, background: "#87d7ad"}}
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.accounts}>
                    <div className={styles.accountsHeader}>
                        <h2>Счета</h2>

                        {/* eslint-disable-next-line react/no-children-prop */}
                        <Button className={styles.accountsButton} children={<svg>
                            <use href="#plus"/>
                        </svg>} text={"Добавить счёт"}/>
                    </div>
                    { Array.isArray(AccountsData) &&   <div className={styles.AccountsList}>
                        { AccountsData?.map(t => <div key={t.id} className={styles.AccountsItem}>
                            <div className={styles.itemLeft}><svg>
                                <use href="#1"/>
                            </svg>
                                <span>{t.name}</span></div>
                            <span>{t.amount} {t.currency} </span>
                        </div>)}

                    </div>}
                </div>
            </div>
        </div>
    );
};
