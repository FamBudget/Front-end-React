import React, { useEffect } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";

import styles from "./Expenses.module.scss";

import { ExpensesArrow } from "../../icons";
import { useDispatch, useSelector } from "react-redux";

import { SelectField } from "../SelectField";
import { Button } from "../Button";
import { DatePickerField } from "../DatePickerFields";
import { fetchAccounts } from "../../redux/reducers/AccountsReducer";
import { fetchMoving } from "../../redux/reducers/MovingReducer";
import {
  addExpense,
  fetchExpenses,
} from "../../redux/reducers/OperationsReducer";
import { fetchExpenseCategories } from "../../redux/reducers/CategoriesReducer";
import { subtractHours } from "../AddingAccount";

const FormSchema = yup.object().shape({
  sum: yup.string().matches(/\d+/, "Неверный формат"),
});

export const Expenses = () => {
  const currency = useSelector((state) => state.registration.currency);
  const accounts = useSelector((state) => state.accounts.data);
  const expenses = useSelector((state) => state.operations.expenses);
  const expenseCategories = useSelector(
    (state) => state.categories.expenseCategories
  );
  const dispatch = useDispatch();

  var newDate = new Date();

  const dispatchData = (values) => {
    const changedValues = {
      ...values,
      createdOn: subtractHours(values.createdOn),
    };
    dispatch(addExpense(changedValues));
  };

  console.log(expenses);
  console.log(accounts);
  console.log(expenseCategories);
  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchMoving());
    dispatch(fetchExpenses());
    dispatch(fetchExpenseCategories());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperForm}>
        <div className={styles.title}>
          <h3>Расходы</h3>
          <ExpensesArrow />
        </div>
        <Formik
          initialValues={{
            accountId: accounts[0]?.id,
            amount: "",
            categoryId: expenseCategories ? expenseCategories[0].id : "",
            createdOn: newDate,
            description: "",
            id: 0,
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatchData(values);
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
                categories={expenseCategories}
                accounts={null}
                className={styles.input}
                label="Категория"
                name="categoryId"
                placeholder="Выберите категорию"
              />
              <SelectField
                accounts={accounts}
                categories={null}
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
      <div className={styles.wrapperStats}>
        <h3>Сумма расходов</h3>
      </div>
    </div>
  );
};
