import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [dataLengths, setDataLengths] = useState([]);
  const endpoints = [
    'https://66312050c92f351c03dc4514.mockapi.io/project',
    'https://663264b2c51e14d69564519c.mockapi.io/client/add',
    'https://66312050c92f351c03dc4514.mockapi.io/employee'
  ];

  useEffect(() => {
    async function fetchData(endpoint) {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.length;
      } catch (error) {
        console.error('Error fetching data:', error);
        return 0; // Return 0 if there's an error
      }
    }

    const fetchDataLengths = async () => {
      const lengths = await Promise.all(endpoints.map(fetchData));
      setDataLengths(lengths);
    };

    fetchDataLengths();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <div className="card-columns col-12 row">
        <div className="card col-3 p-1 m-2" style={{backgroundColor:"#ffffb2"}}>
          <div className="card-body">
            <h5 className="card-title">Employee</h5>
            <h2 className="card-text"> {dataLengths[2]}</h2>
          </div>
        </div>
        <div className="card col-3 p-1 m-2"  style={{backgroundColor:"#ffffb2"}}>
          <div className="card-body">
            <h5 className="card-title">Client</h5>
            <h2 className="card-text"> {dataLengths[1]}</h2>
          </div>
        </div>
        <div className="card col-3 p-1 m-2"  style={{backgroundColor:"#ffffb2"}}>
          <div className="card-body">
            <h5 className="card-title">Project</h5>
            <h2 className="card-text"> {dataLengths[0]}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
