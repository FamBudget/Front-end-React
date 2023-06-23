import React, { useEffect } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";

import styles from "./Expenses.module.scss";

import { ExpensesArrow } from "../../icons";
import { useDispatch, useSelector } from "react-redux";

import { SelectField } from "../SelectField";
import { Button } from "../Button";
import { DatePickerField, formatDate } from "../DatePickerFields";
import { fetchAccounts } from "../../redux/reducers/AccountsReducer";
import { fetchMoving } from "../../redux/reducers/MovingReducer";
import {
  addExpense,
  fetchExpenses,
} from "../../redux/reducers/OperationsReducer";

const FormSchema = yup.object().shape({
  sum: yup.string().matches(/\d+/, "Неверный формат"),
});

export const Expenses = () => {
  const currency = useSelector((state) => state.registration.currency);
  const data = useSelector((state) => state.accounts.data);
  const expenses = useSelector((state) => state.operations.expenses);
  const dispatch = useDispatch();
  var newDate = formatDate(new Date());
  console.log(data);
  console.log(localStorage.getItem("token"));

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchMoving());
    dispatch(fetchExpenses());
  }, []);

  console.log(expenses);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperForm}>
        <div className={styles.title}>
          <h3>Расходы</h3>
          <ExpensesArrow />
        </div>
        <Formik
          initialValues={{
            accountId: 0,
            amount: 0,
            categoryId: 0,
            createdOn: newDate,
            description: "",
            id: 0,
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(addExpense(values));
            setSubmitting(false);
          }}
          validationSchema={FormSchema}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.currency}>{currency}</div>
              <label>Сумма</label>
              <Field
                className={styles.input}
                type="text"
                name="amount"
                placeholder="0"
              />
              <SelectField
                className={styles.input}
                label="Категория"
                name="categoryId"
                placeholder="Выберите категорию"
              />
              <SelectField
                data={data}
                className={styles.input}
                label="Счет"
                name="accountId"
                placeholder="Cчет списания"
              />
              <label>Дата расхода</label>
              <DatePickerField name="createdOn" />
              <label>Комментарий</label>
              <Field
                placeholder="Введите комментарий..."
                className={styles.comment}
                name="description"
                as="textarea"
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                text="Ввести расход"
              />
            </form>
          )}
        </Formik>
      </div>
      <div className={styles.wrapperStats}>Статистика</div>
    </div>
  );
};
