import React, { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import recoveryPass from "../../assets/recoverypass.png";
import styles from "./RecoveryPassword.module.scss";

import { Button, PasswordField, PasswordRecoveryInfo } from "../../components";
import { fetchRecoveryPassword } from "../../redux/reducers/RecoveryPasswordReducer";
import * as yup from "yup";

const FormSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Минимальная длинна 8 символов")
    .matches(/(?=.*\d)/, "Пароль должен содержать цифру от 0 до 9")
    .matches(/(?=.*[a-z])/, "Пароль должен содержать буквы в нижнем регистре")
    .matches(/(?=.*[A-Z])/, "Пароль должен содержать буквы в верхнем регистре")
    .matches(/(?=.*[@$!%*?&_])/, "Пароль должен содержать хотя бы один символ")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{5,16}$/,
      "Пароль не должен содержать последовательность 5 цифр или букв"
    )
    .required("Обязательное поле"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Обязательное поле"),
});

export const RecoveryPassword = ({ setIsOpenRecovery, code, email }) => {
  const forgetPasswordRef = useRef();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.recoveryPassword.status);
  const [isRecoveryInfoOpen, setIsRecoveryInfoOpen] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!forgetPasswordRef.current.contains(e.target))
        setIsOpenRecovery(false);
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
        setIsOpenRecovery(false);
      }, 5000);
    }
  }, [status]);
  return (
    <>
      {isRecoveryInfoOpen ? (
        <div ref={forgetPasswordRef}>
          <PasswordRecoveryInfo
            text={"Пароль успешно восстановлен"}
            img={recoveryPass}
          />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Formik
            validateOnMount={true}
            validationSchema={FormSchema}
            initialValues={{
              password: "",
              confirmPassword: "",
              code,
              email,
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(fetchRecoveryPassword(values));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form ref={forgetPasswordRef} className={styles.form}>
                <h2>Восстановление пароля</h2>
                <PasswordField name="password" placeholder="Новый пароль" />
                {errors.password && <p>{errors.password}</p>}
                <PasswordField
                  name="confirmPassword"
                  placeholder="Повторно новый пароль"
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <Button
                  disabled={
                    Array.isArray(errors) ||
                    Object.values(errors).toString() !== ""
                  }
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
