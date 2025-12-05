import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

function UpdateStudent(){
    const { register, handleSubmit, formState:{errors} } = useForm();

    const onSubmit = async({StudentId,CGPA})=>{
        try{
            await axios.put(`http://localhost:5000/api/students/${StudentId}`, {CGPA});
            alert("CGPA Updated Successfully");
        }catch(err){
            alert("Student Not Found");
        }
    };

    return(
        <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-3">Update CGPA</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("StudentId",{required:"Enter Student ID"})} placeholder="Student ID" className="form-control mb-2"/>
                {errors.StudentId && <p className="text-danger">{errors.StudentId.message}</p>}

                <input {...register("CGPA",{required:"Enter new CGPA",min: { value: 0, message: "CGPA can't be less than 0" },
    max: { value: 10, message: "CGPA can't be more than 10" }})} type="number" placeholder="New CGPA" className="form-control mb-2"/>
                {errors.CGPA && <p className="text-danger">{errors.CGPA.message}</p>}

                <button className="btn btn-warning w-100">Update</button>
            </form>
        </div>
    )
}
export default UpdateStudent;
