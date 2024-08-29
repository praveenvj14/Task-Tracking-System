import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  description: Yup.string().required("Description is Required"),
});

const initialValues = {
  email: "",
  description: "",
};

const Email = () => {
  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission here
    console.log(values);
    resetForm();
  };

  return (
    <div>
      <h4 className="d-flex justify-content-center align-items-center mb-5">
        SEND EMAIL
      </h4>
      <div className="container d-flex justify-content-center align-items-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="form-control"
                  style={{ height: "200px" }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Send Email
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Email;
