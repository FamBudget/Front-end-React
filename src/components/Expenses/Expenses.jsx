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
// import { setExpenses } from "../../redux/reducers/OperationsReducer";

const FormSchema = yup.object().shape({
  sum: yup.string().matches(/\d+/, "Неверный формат"),
});

export const Expenses = () => {
  const currency = useSelector((state) => state.registration.currency);
  const data = useSelector((state) => state.accounts.data);
  const expenses = useSelector((state) => state.operations.expenses);
  const dispatch = useDispatch();
  console.log(data);
  useEffect(() => {
    dispatch(fetchAccounts());
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
            accountId: "",
            amount: "",
            categoryId: "",
            createdOn: new Date(),
            description: "",
            id: "0",
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.sum);
            setSubmitting(false);
          }}
          validationSchema={FormSchema}
        >
          {({ isSubmitting, errors }) => (
            <form>
              <div className={styles.currency}>{currency}</div>
              <label>Сумма</label>
              <Field
                className={styles.input}
                type="text"
                name="amount"
                placeholder="0"
              />
              {errors.sum && <p>{errors.sum}</p>}
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
                name="acoountId"
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
              <Button isSubmitting={isSubmitting} text="Ввести расход" />
            </form>
          )}
        </Formik>
      </div>
      <div className={styles.wrapperStats}>Статистика</div>
    </div>
  );
};
