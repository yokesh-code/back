const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validate:(value)=>{
                return validator.isEmail(value)
        }
    },
    batch:{type:'string',require:true},
     task:{type:'string',require:true},
    taskSolution:{type:'string',require:true},
    marks:{type:'string',default:"Yet to Give"},
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('taskSolution',userSchema);

module.exports={mongoose,usersModel}