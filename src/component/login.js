import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaUnlockAlt } from "react-icons/fa";

const LoginPage = ({setshow}) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    if (
      values.email === "praveen09@gmail.com" &&
      values.password === "praveen@123"
    ) {
      toast.success("Logged in successfully");
      setshow(true)
    } else {
      toast.error("Incorrect email ID or password");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <style>
        {`
          * {
            margin: 0px;
            padding: 0px;
          }
          #box {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: url("https://e1.pxfuel.com/desktop-wallpaper/536/364/desktop-wallpaper-marketing.jpg");
            background-size: cover;
            background-position: center;
            height: 584px;
              // display: flex;
            align-items: center;
            justify-content: center;
          }
          .header{
            align-items: center;
            justify-content: center;
            display: flex;
            margin-bottom:120px;
            padding-top:50px
          }
          .container {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            width: 390px !important;
            text-align: center;
            padding:20px
          }
          .label {
            display: block;
            margin-bottom: 8px;
            margin-left: -200px;
          }
          .input {
            width: 200px;
            padding: 8px;
            margin-bottom: 16px;
            box-sizing: border-box;
            margin-left: -200px;
          }
          .button {
            background-color: #4caf50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: -300px;
          }
          .button:hover {
            background-color: #45a049;
          }
          .collect {
            margin-top: 16px;
            color: #333;
          }
          h3 {
            margin-left: -200px;
            padding: 20px;
          }
        `}
      </style>
      <div id="box">
        <h1 className="header">TASK TRACKING SYSTEM</h1>
        <div class="container">
          <div className="d-flex" style={{alignItems:"center",justifyContent:"center"}}>
            <h5>LOGIN</h5>
            <FaUnlockAlt size={20} style={{padding:"5px"}}/>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div class="row ">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="email">Email:</label>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <Field type="text" name="email" class="form-control" id="email" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        class="error"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="password">Password:</label>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <Field type="password" name="password" class="form-control" id="password" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        class="error"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div>
                    <button type="submit" disabled={isSubmitting} class="btn btn-primary mt-4">
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
