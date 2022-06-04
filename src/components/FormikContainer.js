import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
function FormikContainer() {
  const dropdownOptions = [
    { key: "select an option", value: "" },
    { key: "option 1", value: "option1" },
    { key: "option 2", value: "option2" },
    { key: "option 3", value: "option3" },
  ];

  const radioOptions = [
    { key: "option 1", value: "option1" },
    { key: "option 2", value: "option2" },
    { key: "option 3", value: "option3" },
  ];
  const initialValues = {
    email: "",
    description: "",
    selectOptions: "",
    radioOptions: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    selectOptions: Yup.string().required("Required!"),
    radioOptions: Yup.string().required("Required!"),
  });

  const onSubmit = (values) => console.log("form data", values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <FormikControl
            control="textarea"
            type="description"
            label="Description"
            name="description"
          />
          <FormikControl
            control="select"
            label="Select a Topic"
            name="selectOptions"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            label="Select an Option"
            name="radioOptions"
            options={radioOptions}
          />
          <button type="submit">submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
