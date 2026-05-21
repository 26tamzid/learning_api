import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import studentrouter from './routes/student_routes.js'
import connect_db from './config/database.js'



//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
dotenv.config()
app.use(studentrouter)
connect_db()

// main route
app.get('/',(req,res)=>{
    res.send('home page is open')
})


const PORT = process.env.PORT
//server connection
app.listen(PORT, ()=>{console.log(`SERVER RUN ON PORT ${PORT}`)})