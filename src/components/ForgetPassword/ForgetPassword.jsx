import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { fetchResetPassword } from "../../redux/reducers/ResetPasswordReducer";

import styles from "./ForgetPassword.module.scss";

import { Button, PasswordRecoveryInfo, UserCheckField } from "../../components";

export const ForgetPassword = ({ setIsOpenForgetPassword }) => {
  const forgetPasswordRef = useRef();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.resetPassword.status);
  const [isRecoveryInfoOpen, setIsRecoveryInfoOpen] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!forgetPasswordRef.current.contains(e.target))
        setIsOpenForgetPassword(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (status === "resolved") {
      setIsRecoveryInfoOpen(true);
      setTimeout(() => {
        setIsRecoveryInfoOpen(false);
        setIsOpenForgetPassword(false);
      }, 5000);
    }
  }, [status]);
  return (
    <>
      {isRecoveryInfoOpen ? (
        <div ref={forgetPasswordRef}>
          <PasswordRecoveryInfo />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Formik
            initialValues={{
              email: "",
              userCheck: false,
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(fetchResetPassword(values.email));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form ref={forgetPasswordRef} className={styles.form}>
                <h2>Забыли пароль?</h2>
                <h3>
                  Введите вашу почту, и мы отправим вам письмо для
                  восстановление пароля
                </h3>
                <label>Электронная почта*</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Введите вашу почту"
                />
                {errors.email && <p>{errors.email}</p>}
                <UserCheckField />
                <Button
                  className={styles.registrButton}
                  isSubmitting={isSubmitting}
                  type="submit"
                  text="Восстановить пароль"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};
