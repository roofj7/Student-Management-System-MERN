import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import AddStudent from './pages/AddStudent';
import SearchStudent from './pages/SearchStudent';
import UpdateStudent from './pages/UpdateStudent';
import DeleteStudent from './pages/DeleteStudent';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewStudents from "./pages/ViewStudents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){
  return(
    <>
    <BrowserRouter>
    <h2 className="text-center mt-3 fw-bold"> Student Management System</h2>

      <nav className="navbar navbar-dark bg-dark px-4">
        <Link className="nav-link text-white" to="/add">Add Student</Link>
        <Link className="nav-link text-white" to="/search">Search Student</Link>
        <Link className="nav-link text-white" to="/update">Update CGPA</Link>
        <Link className="nav-link text-white" to="/delete">Delete Student</Link>
        <Link className="nav-link text-white" to="/view">View All</Link>

        </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/add" element={<AddStudent />} />
          <Route path="/search" element={<SearchStudent />} />
          <Route path="/update" element={<UpdateStudent />} />
          <Route path="/delete" element={<DeleteStudent />} />
          <Route path="/view" element={<ViewStudents />} />

        </Routes>
      </div>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={2000}/>
    </>
  )
}
export default App;
