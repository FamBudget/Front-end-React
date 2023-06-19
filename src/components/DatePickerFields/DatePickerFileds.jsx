import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css'

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}



export function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') + ' '+
            [
                date.getHours() ,
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds() )
            ].join(':')
    );
}

export const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            wrapperClassName="w-full"
            dateFormat="yyyy-MM-dd"
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {setFieldValue(field.name, (val))
            }}
        />
    );
};