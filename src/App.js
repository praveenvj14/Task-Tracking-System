import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./sidebar";
import Employee from "./component/employee-details";
import ProList from "./component/project-list";
import Client from "./component/client-details";
import NewDep from "./component/new-departments";
import AddClient from "./component/add-client";
import AddProList from "./component/add-project";
import EmployeeList from "./component/view-employee";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Email from "./component/send-email";
import LoginPage from "./component/login";
import Dashboard from "./component/dashboard";

const Main = () => {
  const [show, setshow] = useState(false);

 
  return (
    <>
      <BrowserRouter>
        {show ? (
          <Sidebar>
            <Routes>
            <Route path="/" element={<Dashboard/>} />
              <Route path="/Project-details" element={<Employee />} />
              <Route path="/Project-detail/:id" element={<Employee />} />
              <Route path="/add-Project-list" element={<AddProList />} />
              <Route path="/add-Project-lists/:id" element={<AddProList />} />
              <Route path="/add-Client-details" element={<AddClient />} />
              <Route path="/add-Client-detail/:id" element={<AddClient />} />
              <Route path="/New-dep" element={<NewDep />} />
              <Route path="/Project-list" element={<ProList />} />
              <Route path="/Client-details" element={<Client />} />
              <Route path="/employee-list" element={<EmployeeList />} />
              <Route path="/send-email" element={<Email />} />
            </Routes>
          </Sidebar>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage setshow={setshow} />} />
          </Routes>
        )}

        <ToastContainer />
      </BrowserRouter>
    
    </>
  );
};

export default Main;
