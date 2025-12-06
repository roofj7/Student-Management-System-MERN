import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";


function DeleteStudent(){
    const { register, handleSubmit, formState:{errors} } = useForm();

    const onSubmit = async({StudentId})=>{
        try{
            await axios.delete(`${process.env.REACT_APP_API_URL}/students/${StudentId}`);

            toast.success("Student Deleted Successfully");

        }catch(err){
            toast.error("Student Not Found");
        }
    };

    return(
        <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-3">Delete Student</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("StudentId",{required:"Enter Student ID"})}
                       placeholder="Student ID" className="form-control mb-2"/>

                {errors.StudentId && <p className="text-danger">{errors.StudentId.message}</p>}

                <button className="btn btn-danger w-100">Delete</button>
            </form>
        </div>
    )
}
export default DeleteStudent;

