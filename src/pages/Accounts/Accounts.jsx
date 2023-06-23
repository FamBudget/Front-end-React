import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from "./Accaunts.module.scss";
import { Button } from "../../components";
import { fetchAccounts } from "../../redux/reducers/AccountsReducer";
import { Modal } from "@mui/material";
import { AddingAccount, MovingAccounts, Container } from "../../components";

export const Accounts = () => {
  const isAuth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);
  const AccountsData = useSelector((state) => state.accounts.data);
  console.log(AccountsData);

  return !isAuth ? (
    <Navigate to="/login" />
  ) : (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.accounts}>
          <div className={styles.accountsHeader}>
            <h2>Счета</h2>

            {/* eslint-disable-next-line react/no-children-prop */}
            <Button
              className={styles.accountsButton}
              handleOpen={handleOpen}
              text={"Добавить счёт"}
            >
              {" "}
              <svg>
                <use href="#plus" />
              </svg>
            </Button>
          </div>

          {Array.isArray(AccountsData) && (
            <div className={styles.AccountsList}>
              {AccountsData?.map((t) => (
                <div key={t.id} className={styles.AccountsItem}>
                  <div className={styles.itemLeft}>
                    <svg>
                      <use href="#1" />
                    </svg>
                    <span>{t.name}</span>
                  </div>
                  <span>
                    {t.amount} {t.currency}{" "}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <MovingAccounts />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <AddingAccount setOpen={setOpen} />
        </div>
      </Modal>
    </Container>
  );
};
