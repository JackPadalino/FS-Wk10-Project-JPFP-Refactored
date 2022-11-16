const { createNextState } = require("@reduxjs/toolkit");
const express = require("express");
const router = express.Router();
const { Student, Campus } = require("../db");

// GET localhost:3000/api/campuses
// route for getting all campuses
router.get("/", async (req,res,next) => {
    try{
        const campuses = await Campus.findAll({
            include:[Student]
        });
        res.status(200).send(campuses);
    }catch(error){
        next(error.message)
    };
});

// GET localhost:3000/api/campuses/:id
// route for getting a single campus based on ID
router.get("/:id", async (req,res,next) => {
    const notFoundMessage = 'The object you are trying to find does not exist!';
    try{
        const campus = await Campus.findByPk(req.params.id,{
            include:[Student]
        });
        if(!campus) throw new Error(notFoundMessage);
        res.status(200).send(campus);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error.message);
    };
});

// GET localhost:3000/api/campuses/:id/students
// router.get("/:id/students", async (req,res,next) => {
//     try{
//         const students = await Student.findAll({
//             include:[{
//                 model:Campus,
//                 where:{
//                     id:req.params.id
//                 }
//             }]
//         });
//         res.status(200).send(students);
//     }catch(error){
//         next('Something went wrong!')
//     };
// });

// POST localhost:3000/api/campuses
// route for creating a new campus
router.post("/", async (req,res,next) => {
    try{
        const data = {
            name:req.body.name,
            state:req.body.state,
            address:req.body.address,
            description:req.body.description,
            imageURL:req.body.imageURL
        };
        const newCampus = await Campus.create(data);
        res.status(200).send(newCampus);
    }catch(error){
        next(error.message)
    };
});

// DELETE localhost:3000/api/campuses/:id
// route for deleting a campus based on ID
router.delete("/:id", async (req, res,next) => {
    const notFoundMessage = 'The object you are trying to delete does not exist!';
    try{
        const campus = await Campus.findByPk(req.params.id);
        if(!campus)throw new Error(notFoundMessage);
        await campus.destroy();
        res.sendStatus(204);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error.message);
    };
});

// PUT localhost:3000/api/campuses/:id
// route for updating a campus based on ID
router.put("/:id", async (req, res, next) => {
    const notFoundMessage = 'The object you are trying to update does not exist!';
    try{
        const data = {
            name:req.body.name,
            state:req.body.state,
            address:req.body.address,
            description:req.body.description,
            imageURL:req.body.imageURL
        };
        const campus = await Campus.findByPk(req.params.id);
        if(!campus) throw new Error(notFoundMessage);
        const updatedCampus = await campus.update(data);
        res.send(200).send(updatedCampus);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error.message);
    };
});

module.exports = router;