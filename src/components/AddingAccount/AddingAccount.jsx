import React, { useRef } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import styles from "./AddingAccount.module.scss";

import { Button } from "../Button";
import { fetchRecoveryPassword } from "../../redux/reducers/RecoveryPasswordReducer";

export const AddingAccount = () => {
  const forgetPasswordRef = useRef();
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            password: "",
            password2: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(fetchRecoveryPassword(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form ref={forgetPasswordRef} className={styles.form}>
              <h2>Добавить счет</h2>
              <Field
                type="password"
                name="password"
                placeholder="Новый пароль"
              />
              {errors.password && <p>{errors.password}</p>}
              <Field
                type="password"
                name="password2"
                placeholder="Повторно новый пароль"
              />
              {errors.password2 && <p>{errors.password2}</p>}

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
    </>
  );
};
