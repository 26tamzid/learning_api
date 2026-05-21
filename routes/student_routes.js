import express from 'express'
import { Router } from 'express'
const router = Router()
import students from '../models/studen_scema.js'
import multer from 'multer'
import path from 'path'
import fs from'fs'



//image upload
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./upload'); 
    },
    filename:(req,file,cb)=>{
        const newfname = Date.now() + path.extname(file.originalname)
        cb(null,newfname);
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{cb(new Error("only images are alow"),false)}
    
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 3
    }
})



//all student
router.get('/all_student', async (req,res)=>{
    try{
        const studentss = await students.find()
        res.json(studentss)

    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//single student
router.get('/all_student/:id', async (req,res)=>{
    try{
        const student = await students.findById(req.params.id)
        if(!student) return res.status(500).json({message:"Student not found"})
        res.json(student)

    }catch(err){
        res.status(500).json({message: err.message})
    }
})

 
//new student
router.post('/all_student',upload.single('Profile_pic'), async (req,res)=>{
    try{
        // const new_student = await students.create(req.body)
        const new_student = new students(req.body)
        if(req.file){
            new_student.Profile_pic = req.file.filename
        }
        const up_student = await new_student.save()
        res.status(201).json(up_student);
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//update student
router.put('/all_student/:id',upload.single('Profile_pic'), async (req,res)=>{
    try{
        const exesting_student = await students.findById(req.params.id)
        if(!exesting_student){
            if(req.file){
                if(req.file.filename){
                    const e_img_path = path.join('./upload',req.file.filename)
                    fs.unlink(e_img_path,(err)=>{
                        if(err)console.log("faild to delete image:",err)
                    })
                }
                return res.status(404).json({message:"Student not found"})    
            }   
        }else{  
            if(req.file){
                if(exesting_student.Profile_pic){
                    const e_img_path = path.join('./upload',exesting_student.Profile_pic)
                    fs.unlink(e_img_path,(err)=>{
                        if(err){console.log("faild to delete:",err)}
                })

                }
            req.body.Profile_pic = req.file.filename
            }
        }


        const update_student = await students.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!update_student) return res.status(500).json({message:"Student not found"})
        res.json(update_student)

    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Delete student
router.delete('/all_student/:id', async (req,res)=>{
    try{
        const delete_student = await students.findByIdAndDelete(req.params.id)
        if(!delete_student) return res.status(500).json({message:"Student not found"})
            if(delete_student.Profile_pic){
                const img_path = path.join('./upload',delete_student.Profile_pic)
                fs.unlink(img_path,(err)=>{
                    if(err){console.log("faild to delete:",err)}
                })
            }
        res.json({message: "student delete"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

export default router;