import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { apiInstance } from "../../redux/api/api";
import { setAuth, setEmail, setError } from "../../redux/reducers/AuthReducer";

import "./styles.scss";

import {
  Button,
  ForgetPassword,
  PasswordField,
  RegistrationForm,
} from "../../components";
import { Facebook, Google } from "../../icons";
import { Modal } from "@mui/material";

export const AuthForm = () => {
  const dispatch = useDispatch();
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);
  const [isOpenForgetPassword, setIsOpenForgetPassword] = useState(false);
  const error = useSelector((state) => state.auth.error);

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
          } else if (!values.password) {
            errors.password = "Обязательное поле";
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
              dispatch(setEmail(values.email));
              localStorage.token = res.data.token;
              localStorage.email = values.email;
            })
            .catch((error) =>
              dispatch(setError(error?.response?.data?.message))
            );
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
            <div className="forget-wrapper">
              <div
                onClick={() => setIsOpenForgetPassword(true)}
                className="forget-password"
              >
                Забыли пароль??
              </div>
            </div>

            {error && <p>{error}</p>}
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

      <Modal open={isOpenRegistration}>
        <div>
          <RegistrationForm setIsOpenRegistration={setIsOpenRegistration} />
        </div>
      </Modal>
      <Modal open={isOpenForgetPassword}>
        <div>
          {" "}
          <ForgetPassword setIsOpenForgetPassword={setIsOpenForgetPassword} />
        </div>
      </Modal>
    </div>
  );
};
