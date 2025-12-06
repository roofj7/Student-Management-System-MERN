import React from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";


function AddStudent(){
    const { register, handleSubmit, formState:{errors}, reset } = useForm();

    const onSubmit = async(data)=>{
        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/students`, data);

            toast.success("Student Added Successfully");
            reset();
        }catch(err){
            toast.error(err.response?.data?.error || "Something went wrong");

        }
    };

    return(
        <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-3">Add Student</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("StudentId",{required:"Enter Student ID"})} placeholder="Student ID" className="form-control mb-2"/>
                {errors.StudentId && <p className="text-danger">{errors.StudentId.message}</p>}

                <input {...register("Name",{required:"Enter Name"})} placeholder="Student Name" className="form-control mb-2"/>
                {errors.Name && <p className="text-danger">{errors.Name.message}</p>}

                <input {...register("Department",{required:"Enter Department"})} placeholder="Department" className="form-control mb-2"/>
                {errors.Department && <p className="text-danger">{errors.Department.message}</p>}

                <input {...register("CGPA",{required:"Enter CGPA",min: { value: 0, message: "CGPA can't be less than 0" },
    max: { value: 10, message: "CGPA can't be more than 10" }})} placeholder="CGPA" type="number" className="form-control mb-2"/>
                {errors.CGPA && <p className="text-danger">{errors.CGPA.message}</p>}

                <button className="btn btn-primary w-100">Add</button>
            </form>
        </div>
    )
}
export default AddStudent;

