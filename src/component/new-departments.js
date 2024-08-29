import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import img from "../no-records.png";

function NewDep() {
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [dep, setdep] = useState();
  const[loading,setLoading]=useState(true)
  const deletedep = (id) => {
    axios
      .delete(
        `https://663264b2c51e14d69564519c.mockapi.io/client/department/${id}`
      )
      .then(() => {
        setdep(departments.filter((department) => department.id !== id));
        toast.success("Department deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Department:", error);
      });
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://663264b2c51e14d69564519c.mockapi.io/client/department"
      );
      const data = await response.json();
      setDepartments(data);
      setLoading(false)
      console.log(departments, "departments");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)

    }
    const loaderTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(loaderTimer);
  };
  const [departmentData, setDepartmentData] = useState({
    code: "",
    name: "",
    numOfEmployees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://663264b2c51e14d69564519c.mockapi.io/client/department",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(departmentData),
        }
      );
      toast.success("Department added successfully");

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Data successfully submitted, close modal
      setShowModal(false);

      // Reset form inputs
      setDepartmentData({
        code: "",
        name: "",
        numOfEmployees: "",
      });

      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [handleSubmit, deletedep]);
  return (
    <>
      <div className="d-flex justify-content-between gap-5 mb-3">
        <h4>NEW DEPARTMENT</h4>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Department</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="departmentCode" className="form-label">
                      Department Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="departmentCode"
                      name="code"
                      value={departmentData.code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="departmentName" className="form-label">
                      Department Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="departmentName"
                      name="name"
                      value={departmentData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="numOfEmployees" className="form-label">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="numOfEmployees"
                      name="numOfEmployees"
                      value={departmentData.numOfEmployees}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Department Code</th>
                <th>Department Name</th>
                <th>Number of Employees</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    <div
                      class="container"
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <div class="row">
                        <div class="col-12">
                          <div class="spinner-container">
                            <div
                              class="spinner-border text-primary"
                              role="status"
                            >
                              <span class="sr-only"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : departments.length === 0 ? (
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
                departments.map((department) => (
                  <tr key={department.id}>
                    <td>{department.code}</td>
                    <td>{department.name}</td>
                    <td>{department.numOfEmployees}</td>
                    <td
                      onClick={() => {
                        deletedep(department.id);
                      }}
                    >
                      <FaTrashAlt style={{ color: "red", cursor: "pointer" }} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default NewDep;
