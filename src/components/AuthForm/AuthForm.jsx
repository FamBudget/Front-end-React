import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";

import { apiInstance } from "../../redux/api/api";
import { setAuth } from "../../redux/reducers/AuthReducer";

import "./styles.scss";

import {
  Button,
  RegistrationForm,
  PasswordField,
  ForgetPassword,
} from "../../components";
import { Facebook, Google } from "../../icons";

export const AuthForm = () => {
  const dispatch = useDispatch();
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);
  const [isOpenForgetPassword, setIsOpenForgetPassword] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Обязательное поле";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Неверный адрес";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          apiInstance
            .post(`authentication`, {
              email: values.email,
              password: values.password,
            })
            .then((res) => {
              dispatch(setAuth(res.data.token));
              localStorage.token = res.data.token;
            }).catch(console.log);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Электронная почта*</label>
            <Field type="email" name="email" placeholder="Введите вашу почту" />
            <ErrorMessage name="email" component="p" />
            <PasswordField label="Пароль*" placeholder="Введите ваш пароль" />
            <ErrorMessage name="password" component="p" />
            <div
              onClick={() => setIsOpenForgetPassword(true)}
              className="forget-password"
            >
              Забыли пароль?
            </div>
            <Button
              className="main-form-button"
              isSubmitting={isSubmitting}
              type="submit"
              text="Войти"
            />
            <div className="alter-auth">
              <span>Или войти через</span>
            </div>
            <div className="buttons-block">
              <button>
                <Google />
                <span>Google</span>
              </button>
              <button>
                <Facebook /> <span>Facebook</span>
              </button>
            </div>
            <div className="register">
              Не имеете аккаунта?{" "}
              <span onClick={() => setIsOpenRegistration(true)}>
                Зарегистрируйтесь
              </span>
            </div>
          </Form>
        )}
      </Formik>
      {isOpenRegistration && (
        <RegistrationForm setIsOpenRegistration={setIsOpenRegistration} />
      )}
      {isOpenForgetPassword && (
        <ForgetPassword setIsOpenForgetPassword={setIsOpenForgetPassword} />
      )}
    </div>
  );
};
