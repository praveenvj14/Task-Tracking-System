import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
function AddPro() {
  const { id } = useParams();
  const [project, setproject] = useState(null);
  
  useEffect(() => {
    if (id) {
      axios
        .get(`https://66312050c92f351c03dc4514.mockapi.io/project/${id}`)
        .then((response) => {
          setproject(response.data);
          console.log(project, "client");
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [id]);
  const initialValues = {
    projectCode:project?.clientCode|| "",
    projectName:project?.projectName|| "",
    clientCode:project?.clientCode|| "",
    contactPersonName:project?.contactPersonName|| "",
    mobileNumber:project?.projectCode|| "",
    email:project?.email|| "",
    projectStatus:project?.projectStatus|| "",
  };

  const validationSchema = Yup.object().shape({
    projectCode: Yup.string().required("Project Code is required"),
    projectName: Yup.string().required("Project Name is required"),
    clientCode: Yup.string().required("Client Code is required"),
    contactPersonName: Yup.string().required("Contact Person Name is required"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    projectStatus: Yup.string().required("Project Status is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values, "values");
    try {
      if (id) {
        await axios.put(
          `https://66312050c92f351c03dc4514.mockapi.io/project/${id}`,
          values
        );
        toast.success("Project updated successfully");
      } else {
        await axios.post(
          "https://66312050c92f351c03dc4514.mockapi.io/project",
          values // Sending the values object when adding a new client
        );
        toast.success("Project added successfully");
      }
      resetForm();
    } catch (error) {
      console.error("Error posting/updating data:", error);
      toast.error("Failed to add/update employee");
    }
    setSubmitting(false);
  };
  

  return (
    <div className="container">
      <h3 className="text-center mb-5">{id?"UPDATE PROJECT":"ADD PROJECT"}</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}

      >
        {({ isSubmitting }) => (
          <Form id="form">
            <div className="row mb-3">
              <label htmlFor="projectCode" className="col-sm-2 col-form-label">
                Project Code:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="projectCode"
                  name="projectCode"
                />
                <ErrorMessage
                  name="projectCode"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="projectName" className="col-sm-2 col-form-label">
                Project Name:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="projectName"
                  name="projectName"
                />
                <ErrorMessage
                  name="projectName"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="clientCode" className="col-sm-2 col-form-label">
                Client Code:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="clientCode"
                  name="clientCode"
                />
                <ErrorMessage
                  name="clientCode"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="contactPersonName"
                className="col-sm-2 col-form-label"
              >
                Contact Person Name:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="contactPersonName"
                  name="contactPersonName"
                />
                <ErrorMessage
                  name="contactPersonName"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="mobileNumber" className="col-sm-2 col-form-label">
                Mobile Number:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  name="mobileNumber"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="projectStatus"
                className="col-sm-2 col-form-label"
              >
                Project Status:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="projectStatus"
                  name="projectStatus"
                />
                <ErrorMessage
                  name="projectStatus"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {id ? "UPDATE" : "SUBMIT"}
            </button>{" "}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddPro;
