const express = require("express");
const router = express.Router();
const { Student, Campus } = require("../db");

// GET localhost:3000/api/students
// route for getting all students
router.get("/", async (req,res,next) => {
    try{
        const students = await Student.findAll({
            include:[Campus]
        });
        res.status(200).send(students);
    }catch(error){
        next(error.message)
    }
});

// GET localhost:3000/api/students/:id
// route for getting a student based on ID
router.get("/:id", async (req,res,next) => {
    const notFoundMessage = 'The object you are trying to find does not exist!';
    try{
        const student = await Student.findByPk(req.params.id,{
            include:[Campus]
        });
        if(!student)throw new Error(notFoundMessage);
        res.status(200).send(student);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error.message);
    }
});

// POST localhost:3000/api/students
// route for creating a new student
router.post("/", async (req,res,next) => {
    try{
        const data = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            imageURL:req.body.imageURL,
            gpa:req.body.gpa,
            campusId:req.body.campusId
        };
        const newStudent = await Student.create(data);
        res.status(201).send(newStudent);
    }catch(error){
        next(error.message)
    };
});

// DELETE localhost:3000/api/students
// route for deleting a student based on ID
router.delete("/:id", async (req, res,next) => {
    const notFoundMessage = 'The object you are trying to delete does not exist!';
    try{
        const student = await Student.findByPk(req.params.id);
        if(!student) throw new Error(notFoundMessage);
        await student.destroy();
        res.sendStatus(204);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error.message);
    };
});

// PUT localhost:3000/api/students/:id
// route for updating a student based on ID
router.put("/:id", async (req, res, next) => {
    // Validating data
    // Null = A human decided to leave this empty
    // Undefined = A computer decided to leave this empty
    const notFoundMessage = 'The object you are trying to update does not exist!';
    try{
        const data = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            imageURL:req.body.imageURL,
            gpa:req.body.gpa,
            campusId:req.body.campusId
        };
        const student = await Student.findByPk(req.params.id);
        if(!student) throw new Error(notFoundMessage);
        const updatedStudent = await student.update(data);
        res.status(200).send(updatedStudent);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error.message);
    };
});

module.exports = router;