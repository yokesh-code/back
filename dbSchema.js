const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    firstName:{type:'string',required:true},
    lastName:{type:'string',required:true},
    batch:{type:'string',default:""},
    mobileNumber:{type:Number,required:true},
    role:{type:'string',require:true},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validate:(value)=>{
                return validator.isEmail(value)
        }
    },
    password:{type:'string',required:true},
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('users',userSchema);

module.exports={mongoose,usersModel}