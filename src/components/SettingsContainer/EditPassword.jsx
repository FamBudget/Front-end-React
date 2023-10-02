import React, {useState} from "react";
import {Form, Formik} from "formik";
import styles from "./SettingsMenu.module.scss";

import {Button, PasswordField} from "../../components";
import * as yup from "yup";
import {Modal} from "@mui/material";

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

export const EditPassword = ({changePassword}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return <div className={styles.wrapper}>

    <Button
        onClick={() => handleOpen()}
        className={styles.buttonActive}
        text="Изменить пароль"
    />
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
    >
      <div className={styles.editPassworWrapper}>
        <Formik
            validateOnMount={true}
            validationSchema={FormSchema}
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              changePassword(values)
              setSubmitting(false);
              handleClose()
            }}
        >
          {({ isSubmitting, errors }) => (
              <Form  className={styles.form}>
                <h2>Изменение пароля</h2>
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
                    text="Изменить пароль"
                />
              </Form>
          )}
        </Formik>
      </div>
    </Modal>

  </div>

};
