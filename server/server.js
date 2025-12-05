const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyparser.json());

// DB Connection
// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Schema
const StudentSchema = new mongoose.Schema({
    StudentId: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Department: { type: String, required: true },
    CGPA: { type: Number, required: true }
});

const Student = mongoose.model("Student", StudentSchema);

// CREATE
app.post('/api/students', async(req,res)=>{
    try {
        const student = new Student(req.body);
        await student.save();
        res.json(student);
    } catch(err){
        if (err.code === 11000) {
    return res.status(400).json({ error: "Student ID already exists" });
}
res.status(400).json({error: "Failed to add student"});

    }
});

// READ one
app.get('/api/students/:id', async(req,res)=>{
    try{
        const s = await Student.findOne({StudentId: req.params.id});
        if(!s) return res.status(404).json({message:"Student Not Found"});
        res.json(s);
    } catch(err){
        res.status(500).json({error:"Error fetching student"});
    }
});

// UPDATE (only CGPA)
app.put('/api/students/:id', async(req,res)=>{
    try{
        const s = await Student.findOneAndUpdate(
            {StudentId: req.params.id},
            {CGPA: req.body.CGPA},
            {new: true}
        );

        if(!s) return res.status(404).json({message:"Student Not Found"});
        res.json(s);

    } catch(err){
        res.status(500).json({error:"Update Failed"});
    }
});

// READ ALL
app.get('/api/students', async (req,res)=>{
    const students = await Student.find();
    res.json(students);
});


// DELETE
app.delete('/api/students/:id', async(req,res)=>{
    const s = await Student.findOneAndDelete({StudentId:req.params.id});
    if(!s) return res.status(404).json({message:"Student Not Found"});
    res.json({message:"Student Deleted Successfully"});
});

app.listen(5000, ()=>console.log("Server running on port 5000"));
