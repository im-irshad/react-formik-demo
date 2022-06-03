import React from "react";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError";
import { computeHeadingLevel } from "@testing-library/react";
export const YupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    tlfNr: ["", ""],
    phNumbers: [""],
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("invalid email format").required("Required!!!"),
    channel: Yup.string().required("Required"),
  });

  const validateComments = (value) => {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      //validateOnChange={false}
      //validateOnBlur= {false}
    >
      {(formik) => {
        console.log("formik", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="name">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" />
            </div>
            <div className="form-control">
              <label htmlFor="channel">channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" />
            </div>
            <div className="form-control">
              <label htmlFor="comments">comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="address">address</label>
              <Field name="address">
                {(props) => {
                  const { field, form, meta } = props;

                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </Field>
              <div className="form-control">
                <label htmlFor="facebook">Facebook</label>
                <Field type="text" id="facebook" name="social.facebook" />
              </div>
              <div className="form-control">
                <label htmlFor="twitter">Twitter</label>
                <Field type="text" id="twitter" name="social.twitter" />
              </div>
              <div className="form-control">
                <label htmlFor="tlf1">Primary Tlf.</label>
                <Field type="text" id="tlf1" name="tlfNr[0]" />
              </div>
              <div className="form-control">
                <label htmlFor="tlf2">Secondary Tlf.</label>
                <Field type="text" id="tlf2" name="tlfNr[1]" />
              </div>
              <div className="form-control">
                <label>List of Tlf.</label>
                <FieldArray name="phNumbers">
                  {(fArrayProps) => {
                    const { push, remove, form } = fArrayProps;
                    const { values } = form;
                    const { phNumbers } = values;
                    console.log(phNumbers);
                    return (
                      <div className="form-control">
                        {phNumbers.map((number, index) => (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                            <button type="button" onClick={() => push("")}>
                              {" "}
                              +{" "}
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
            </div>

            <button
              type="submit"
              //  disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
            <button type="button">Validate comments</button>
          </Form>
        );
      }}
    </Formik>
  );
};
