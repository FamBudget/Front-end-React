import React, {useEffect, useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import recoveryPass from '../../assets/recoverypass.png'
import styles from "./RecoveryPassword.module.scss";

import {Button, PasswordRecoveryInfo} from "../../components";
import {fetchRecoveryPassword} from "../../redux/reducers/RecoveryPasswordReducer";

export const RecoveryPassword = ({ setIsOpenRecovery, code, email}) => {
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
        <div  ref={forgetPasswordRef}>
          <PasswordRecoveryInfo  text={'Пароль успешно восстановлен'} img={recoveryPass}/>
        </div>
      ) : (
        <div  className={styles.wrapper}>
          <Formik
            initialValues={{
              password: "",
              password2: "",
              code,
              email
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(fetchRecoveryPassword(values));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form ref={forgetPasswordRef} className={styles.form}>
                <h2>Восстановление пароля</h2>
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
      )}
    </>
  );
};
