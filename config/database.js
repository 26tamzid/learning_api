import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//db connections
const connect_db =()=>{
    mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("database connected")})
.catch(err =>{console.log(err)})
} 
export default connect_db