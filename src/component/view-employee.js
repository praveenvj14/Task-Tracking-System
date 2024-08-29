import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import img from "../no-records.png"

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
        const response = await axios.get('https://66312050c92f351c03dc4514.mockapi.io/employee');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://66312050c92f351c03dc4514.mockapi.io/employee/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
      toast.success('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center mb-5">EMPLOYEE DETAILS</h3>
      {isLoading ? (
             <div class="container" style={{alignContent:"center",justifyContent:"center",display:"flex"}}>
             <div class="row">
               <div class="col-12">
                 <div class="spinner-container">
                   <div class="spinner-border text-primary" role="status">
                     <span class="sr-only"></span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Salary</th>
              <th>Destination</th>
              <th>Joining Date</th>
              <th>Resigning Date</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.contact}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.destination}</td>
                  <td>{employee.joiningDate}</td>
                  <td>{employee.resigningDate}</td>
                  <td>{employee.experience}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <p onClick={() => deleteEmployee(employee.id)}><FaTrashAlt style={{ color: "red", cursor: "pointer" }} /></p>
                      <Link to={`/Project-detail/${employee.id}`}><CiEdit size={20} style={{ cursor: "pointer" }} /></Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
              <td colSpan="8" className="text-center">
                <img src={img} style={{height:"200px",width:"200px",marginTop:"100px"}}/><br/>
                No records found
                </td>
            </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;
