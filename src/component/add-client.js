import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
function AddClient() {
  const { id } = useParams();
  const [client, setclient] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://663264b2c51e14d69564519c.mockapi.io/client/add/${id}`)
        .then((response) => {
          setclient(response.data);
          console.log(client, "client");
        })
        .catch((error) => {
          console.error("Error fetching Client data:", error);
        });
    }
  }, [id]);

  const initialValues = {
    clientCode: client?.clientCode || "",
    projectName: client?.projectName || "",
    clientName: client?.clientName || "",
    address: client?.address || "",
    contactPersonName: client?.contactPersonName || "",
    contactNumber: client?.contactNumber || "",
    faxNumber: client?.faxNumber || "",
    email: client?.email || "",
  };

  const validationSchema = Yup.object().shape({
    clientCode: Yup.string().required("Client Code is required"),
    projectName: Yup.string().required("Project Name is required"),
    clientName: Yup.string().required("Client Name is required"),
    address: Yup.string().required("Address is required"),
    contactPersonName: Yup.string().required("Contact Person Name is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    faxNumber: Yup.string().required("Fax Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values, "values");
    try {
      if (id) {
        await axios.put(
          `https://663264b2c51e14d69564519c.mockapi.io/client/add/${id}`,
          values
        );
        toast.success("Client updated successfully");
      } else {
        await axios.post(
          "https://663264b2c51e14d69564519c.mockapi.io/client/add",
          values // Sending the values object when adding a new client
        );
        toast.success("Client added successfully");
      }
      resetForm();
    } catch (error) {
      console.error("Error posting/updating data:", error);
      toast.error("Failed to add/update Client");
    }
    setSubmitting(false);
  };
  
  return (
    <div className="container">
      <h3 className="text-center mb-5">{id?"UPDATE CLIENT":"ADD CLIENT"}</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form id="form">
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
              <label htmlFor="clientName" className="col-sm-2 col-form-label">
                Client Name:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="clientName"
                  name="clientName"
                />
                <ErrorMessage
                  name="clientName"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="address" className="col-sm-2 col-form-label">
                Address:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                />
                <ErrorMessage
                  name="address"
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
              <label
                htmlFor="contactNumber"
                className="col-sm-2 col-form-label"
              >
                Contact Number:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  name="contactNumber"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="faxNumber" className="col-sm-2 col-form-label">
                Fax Number:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="faxNumber"
                  name="faxNumber"
                />
                <ErrorMessage
                  name="faxNumber"
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

export default AddClient;
