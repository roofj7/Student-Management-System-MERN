import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/students`)
    setStudents(res.data);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="text-center mb-3">All Students</h3>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>CGPA</th>
          </tr>
        </thead>

        <tbody>
          {students.length ? (
            students.map((s) => (
              <tr key={s.StudentId}>
                <td>{s.StudentId}</td>
                <td>{s.Name}</td>
                <td>{s.Department}</td>
                <td>{s.CGPA}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No Students Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewStudents;

