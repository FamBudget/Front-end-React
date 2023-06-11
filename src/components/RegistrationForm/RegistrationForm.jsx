import React, { useEffect, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { fetchRegistration } from "../../redux/reducers/RegistrationReducer";
import { setAuth } from "../../redux/reducers/AuthReducer";

import styles from "./RegistrationForm.module.scss";

import { ArrowDown } from "../../icons";
import { Button, PasswordField, UserCheckField } from "../../components";

const FormSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Минимальная длинна 8 символов")
    .matches(/(?=.*\d)/, "Пароль должен содержать цифру от 0 до 9")
    .matches(/(?=.*[a-z])/, "Пароль должен содержать буквы в нижнем регистре")
    .matches(/(?=.*[A-Z])/, "Пароль должен содержать буквы в верхнем регистре")
    .matches(/(?=.*[@$!%*?&])/, "Пароль должен содержать хотя бы один символ")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/,
      "Пароль не должен содержать последовательность 5 цифр или букв"
    )
    .required("Обязательное поле"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Обязательное поле"),
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Неверный адрес электронной почты"
    )
    .required("Обязательное поле"),
});

export const RegistrationForm = ({ setIsOpenRegistration }) => {
  const dispatch = useDispatch();

  const registrationRef = useRef();
  let status = useSelector((state) => state.registration.status);
  console.log(status);
  console.log(status);

  useEffect(() => {
    let handler = (e) => {
      if (!registrationRef.current.contains(e.target))
        setIsOpenRegistration(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          currency: "RUB",
          password: "",
          confirmPassword: "",
          userCheck: false,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(fetchRegistration(values));
          if (status === "resolved") {
            dispatch(setAuth(values.email));
            localStorage.email = values.email;
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form ref={registrationRef} className={styles.form}>
            <label>Электронная почта*</label>
            <Field type="email" name="email" placeholder="Введите вашу почту" />
            {errors.email && <p>{errors.email}</p>}
            <div className={styles.inputsWrapper}>
              <div>
                <label>Имя</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Введите вашу имя"
                />
              </div>
              <div>
                <label>Фамилия</label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Введите вашу фамилию"
                />
              </div>
            </div>
            <div>
              <label>Выбор валюты</label>
              <Field as="select" name="currency">
                <option value="RUB">(₽) RUB</option>
                <option value="BYN">(Br) BYN</option>
                <option value="USD">($) USD</option>
                <option value="EUR">(€) EUR</option>
                <option value="KZT">(₸) KZT</option>
              </Field>
              <ArrowDown className={styles.arrow} />
            </div>
            <PasswordField label="Пароль" placeholder="Введите пароль" />
            {errors.password && <p>{errors.password}</p>}
            <PasswordField
              name="confirmPassword"
              placeholder="Введите повторно пароль"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <UserCheckField />
            <Button
              className={styles.registrButton}
              isSubmitting={isSubmitting}
              type="submit"
              text="Зарегистрироваться"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
