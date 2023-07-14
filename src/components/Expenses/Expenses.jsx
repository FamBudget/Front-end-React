import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";

import styles from "./Expenses.module.scss";

import { ExpensesArrow } from "../../icons";
import { useDispatch, useSelector } from "react-redux";

import { SelectField } from "../SelectField";
import { Button } from "../Button";
import { DatePickerField } from "../DatePickerFields";
import { fetchAccounts } from "../../redux/reducers/AccountsReducer";
import {
  addExpense,
  fetchExpenses,
} from "../../redux/reducers/OperationsReducer";
import { fetchExpenseCategories } from "../../redux/reducers/CategoriesReducer";
import { subtractHours } from "../AddingAccount";
import { Diagram } from "../Diagram";
import { subtractMonths } from "../FIlterOperations/FiltersOperations";
import { fetchMoving } from "../../redux/reducers/MovingReducer";

const FormSchema = yup.object().shape({
  amount: yup
    .string()
    .matches(/\d+/, "Неверный формат")
    .required("Обязательное поле"),
});

function subtractWeek(date) {
  date.setDate(date.getDate() - 7);
  return date;
}

function subtractDay(date) {
  date.setDate(date.getDate() - 1);
  return date;
}

export const Expenses = () => {
  const currency = useSelector((state) => state.accounts?.data[0]?.currency);
  const accounts = useSelector((state) => state.accounts.data);
  const expenses = useSelector((state) => state.operations.expenses);
  const expenseCategories = useSelector(
    (state) => state.categories.expenseCategories
  );
  const dispatch = useDispatch();
  const options = [
    { value: "1", text: "За день" },
    { value: "2", text: "За неделю" },
    { value: "3", text: "За месяц" },
  ];

  const [selected, setSelected] = useState(options[1].value);
  const [query, setQuery] = useState({
    endDate: new Date(),
    startDate: subtractWeek(new Date()),
    sort: "DATE",
    sortDesc: false,
  });

  var newDate = new Date();

  const dispatchData = (values) => {
    const changedValues = {
      ...values,
      createdOn: subtractHours(values.createdOn),
    };
    dispatch(addExpense(changedValues));
  };
  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchExpenseCategories());
    dispatch(fetchExpenses(query));
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
    let date = new Date();
    let startDate;
    if (e.target.value === 1) {
      startDate = subtractDay(date);
    } else if (e.target.value === 2) {
      startDate = subtractWeek(date);
    } else if (e.target.value === 3) {
      startDate = subtractMonths(date);
    }
    dispatch(fetchMoving({ ...query, startDate }));
    setQuery({ ...query, startDate });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperForm}>
        <div className={styles.title}>
          <h3>Расходы</h3>
          <ExpensesArrow />
        </div>
        <Formik
          initialValues={{
            accountId: "",
            amount: "",
            categoryId: "",
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
          {({ handleSubmit, isSubmitting, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.currency}>{currency}</div>
              <label>Сумма</label>
              <Field
                className={styles.input}
                type="text"
                name="amount"
                placeholder="0"
              />
              {errors.amount && <p>{errors.amount}</p>}
              <SelectField
                placeholder="Выбор категории"
                categories={expenseCategories}
                accounts={null}
                className={styles.input}
                label="Категория"
                name="categoryId"
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
        <div className={styles.titleBlock}>
          <h3>Сумма расходов</h3>
          <select onChange={handleChange} value={selected}>
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        <Diagram
          currency={currency}
          expenses={expenses}
          expensesCategories={expenseCategories}
        />
        <div className={styles.devideLine}></div>
      </div>
    </div>
  );
};
