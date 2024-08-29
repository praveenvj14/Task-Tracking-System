import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import img from "../no-records.png";

function Client() {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 500);
  }, []);

  const fetchData = () => {
    axios
      .get("https://663264b2c51e14d69564519c.mockapi.io/client/add")
      .then((response) => {
        setProject(response.data);
        console.log(response.data, "xfcvhjk");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const deleteProject = (id) => {
    axios
      .delete(`https://663264b2c51e14d69564519c.mockapi.io/client/add/${id}`)
      .then(() => {
        setProject(project.filter((proj) => proj.id !== id));
        toast.success("Client deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  return (
    <div className="container">
      <h3 className="text-center mb-5">CLIENT DETAILS</h3>
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
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Project Name</th>
              <th>Client Name</th>
              <th>Address</th>
              <th>Person Name</th>
              <th>Phone Number</th>
              <th>Fax Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {project.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <img
                    src={img}
                    style={{
                      height: "200px",
                      width: "200px",
                      marginTop: "100px",
                    }}
                  />
                  <br />
                  No records found
                </td>
              </tr>
            ) : (
              project.map((proj) => (
                <tr key={proj.id}>
                  <td>{proj.clientCode}</td>
                  <td>{proj.projectName}</td>
                  <td>{proj.clientName}</td>
                  <td>{proj.address}</td>
                  <td>{proj.contactPersonName}</td>
                  <td>{proj.contactNumber}</td>
                  <td>{proj.faxNumber}</td>
                  <td>{proj.email}</td>
                  <td>
                    <div className="" style={{ display: "flex" }}>
                      <p onClick={() => deleteProject(proj.id)}>
                        <FaTrashAlt style={{ color: "red" }} />
                      </p>
                      <Link to={`/add-Client-detail/${proj.id}`}>
                        <CiEdit size={20} />
                      </Link>
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

export default Client;
