import mongoose from 'mongoose'



const studentScema = new mongoose.Schema({
    Name:{
        type:String,
        require : true
    },
    Email: {
        type : String,
        require : true,
        unique : true
    },

    Number: {
        type: Number,
        require: true,
    },
    
    Gender: {
        type: String,
        require: true,
        enum:['male','female'] 
    }
})

const student = mongoose.model('student',studentScema)

export default student