import { ErrorMessage, Field } from "formik";
import React from "react";
import { TextError } from "./TextError";

export const Textarea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest}></Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};
