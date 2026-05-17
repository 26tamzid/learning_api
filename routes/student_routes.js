import express from 'express'
import { Router } from 'express'
import student from './models/studen_scema.js'


//all student
router.get('/all_student', async (req,res)=>{
    try{
        const students = await student.find()
        res.json(students)

    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//single student
router.get('/all_student/:id', async (req,res)=>{
    try{
        const student = await student.findById(req.params.id)
        if(!student) return res.status(500).json({message:"Student not found"})
        res.json(student)

    }catch(err){
        res.status(500).json({message: err.message})
    }
})

 
//new student
router.post('/all_student', async (req,res)=>{
    try{
        const new_student = await student.create(req.body)
        res.status(201).json(new_student);
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//update student
router.put('/all_student/:id ', async (req,res)=>{
    try{
        const update_student = await student.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!update_student) return res.status(500).json({message:"Student not found"})
        res.json(update_student)

    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Delete student
router.delete('/all_student/:id', async (req,res)=>{
    try{
        const delete_student = await student.findByIdAndDelete(req.params.id)
        if(!delete_student) return res.status(500).json({message:"Student not found"})
        res.json({message: "student delete"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

export default router;