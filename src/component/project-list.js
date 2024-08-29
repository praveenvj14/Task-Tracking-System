import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import img from "../no-records.png"

function Viewpro() {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://66312050c92f351c03dc4514.mockapi.io/project');
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const loaderTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(loaderTimer);
  }, []);

  const deleteProject = (id) => {
    axios.delete(`https://66312050c92f351c03dc4514.mockapi.io/project/${id}`)
      .then(() => {
        setProject(project.filter(project => project.id !== id));
        toast.success('Project deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <div className="container">
      <h3 className="text-center mb-5">PROJECT DETAILS</h3>
      {loading ? (
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
    </div>      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Project Code</th>
              <th>Project Name</th>
              <th>Client Code</th>
              <th>Contact Person Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Project Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {project.length === 0 ? (
                        <tr>
                        <td colSpan="8" className="text-center">
                          <img src={img} style={{height:"200px",width:"200px",marginTop:"100px"}}/><br/>
                          No records found
                          </td>
                      </tr>
            ) : (
              project.map(project => (
                <tr key={project.id}>
                  <td>{project.projectCode}</td>
                  <td>{project.projectName}</td>
                  <td>{project.clientCode}</td>
                  <td>{project.contactPersonName}</td>
                  <td>{project.mobileNumber}</td>
                  <td>{project.email}</td>
                  <td>{project.projectStatus}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <p onClick={() => deleteProject(project.id)}><FaTrashAlt style={{ color: "red", cursor: "pointer" }} /></p>
                      <Link to={`/add-Project-lists/${project.id}`}><CiEdit size={20} style={{ cursor: "pointer", marginLeft: "10px" }} /></Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Viewpro;
