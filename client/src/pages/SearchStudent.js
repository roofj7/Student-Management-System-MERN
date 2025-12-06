import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";


function SearchStudent(){
    const { register, handleSubmit, formState:{errors} } = useForm();
    const [student, setStudent] = useState(null);

    const onSubmit = async({StudentId})=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/students/${StudentId}`);

            setStudent(res.data);
        }catch(err){
            setStudent(null);
            toast.error("Student Not Found");

        }
    };

    return(
        <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-3">Search Student</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("StudentId",{required:"Enter Student ID"})}
                       placeholder="Student ID" className="form-control mb-2"/>

                {errors.StudentId && <p className="text-danger">{errors.StudentId.message}</p>}

                <button className="btn btn-success w-100">Search</button>
            </form>

            {student && (
                <div className="mt-3">
                    <p><b>Name:</b> {student.Name}</p>
                    <p><b>Department:</b> {student.Department}</p>
                    <p><b>CGPA:</b> {student.CGPA}</p>
                </div>
            )}
        </div>
    )
}
export default SearchStudent;

