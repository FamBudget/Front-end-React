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
  console.log(placeholder);
  return (
    <div>
      <label>{label}</label>
      <Field
        as="select"
        defaultValue={placeholder}
        className={className}
        name={name}
      >
        {accounts?.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}

        {categories?.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Field>
    </div>
  );
};
