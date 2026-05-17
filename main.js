import express from 'express'
const app = express()
import mongoose from 'mongoose'
import studentrouter from './routes/student_routes.js'


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(studentrouter)


//db connections
mongoose.connect('mongodb://127.0.0.1:27017/learn_api')
.then(()=>{console.log("database connected")})
.catch(err =>{console.log(err)})

//routes
app.get('/',(req,res)=>{
    res.send('home page is open')
})



//server connection
app.listen(7000, ()=>{console.log("SERVER RUN ON PORT 6000")})