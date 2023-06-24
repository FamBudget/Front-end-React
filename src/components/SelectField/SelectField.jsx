import React from "react";
import { Field } from "formik";

export const SelectField = ({
  label,
  name,
  placeholder,
  className,
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
        {categories?.map(({ name, id }) => (
          <option key={id}>{name}</option>
        ))}
      </Field>
    </div>
  );
};
