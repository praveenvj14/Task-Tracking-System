import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";


function Employee() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://66312050c92f351c03dc4514.mockapi.io/employee/${id}`)
        .then((response) => {
          setEmployeeData(response.data);
          console.log(employeeData,"employeeData");
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [id]);

  const initialValues = {
    name: employeeData?.name|| "",
    email:employeeData?.email|| "",
    contact: employeeData?.contact|| "",
    salary:employeeData?.salary|| "",
    destination: employeeData?.destination||"",
    joiningDate:employeeData?.joiningDate|| "",
    resigningDate:employeeData?.resigningDate|| "",
    experience:employeeData?.experience|| "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contact: Yup.string().required("Contact is required"),
    salary: Yup.string().required("Salary is required"),
    destination: Yup.string().required("Destination is required"),
    joiningDate: Yup.date().required("Joining date is required"),
    resigningDate: Yup.date().required("Resigning date is required"),
    experience: Yup.string().required("Experience is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (id) {
        await axios.put(
          `https://66312050c92f351c03dc4514.mockapi.io/employee/${id}`,
          values
        );
        toast.success("Employee updated successfully");
      } else {
        await axios.post(
          "https://66312050c92f351c03dc4514.mockapi.io/employee",
          values
        );
        toast.success("Employee added successfully");
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
      <h3 className="text-center mb-5">{id?"UPDATE EMPLOYEE":"ADD EMPLOYEE"}</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form id="form">
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name:
              </label>
              <div className="col-sm-10 col-12">
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <ErrorMessage name="name" component="div" className="error" />
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
              <label htmlFor="contact" className="col-sm-2 col-form-label">
                Contact:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="salary" className="col-sm-2 col-form-label">
                Salary:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="salary"
                  name="salary"
                />
                <ErrorMessage name="salary" component="div" className="error" />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="destination" className="col-sm-2 col-form-label">
                Destination:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="destination"
                  name="destination"
                />
                <ErrorMessage
                  name="destination"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="joiningDate" className="col-sm-2 col-form-label">
                Date of joining:
              </label>
              <div className="col-sm-10">
                <Field
                  type="date"
                  className="form-control"
                  id="joiningDate"
                  name="joiningDate"
                />
                <ErrorMessage
                  name="joiningDate"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="resigningDate"
                className="col-sm-2 col-form-label"
              >
                Date of Resigning:
              </label>
              <div className="col-sm-10">
                <Field
                  type="date"
                  className="form-control"
                  id="resigningDate"
                  name="resigningDate"
                />
                <ErrorMessage
                  name="resigningDate"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="experience" className="col-sm-2 col-form-label">
                Experience:
              </label>
              <div className="col-sm-10">
                <Field
                  type="text"
                  className="form-control"
                  id="experience"
                  name="experience"
                />
                <ErrorMessage
                  name="experience"
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

export default Employee;
