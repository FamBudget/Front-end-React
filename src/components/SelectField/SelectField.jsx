import React from "react";
import { Field } from "formik";

export const SelectField = ({
  label,
  name,
  placeholder,
  className,
  accounts,
  categories,
}) => {
  return (
    <div>
      <label>{label}</label>
      <Field
        className={className}
        as="select"
        name={name}
        placeholder={placeholder}
      >
        { Array.isArray(accounts) && accounts?.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
        {Array.isArray(accounts) && categories?.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Field>
    </div>
  );
};
