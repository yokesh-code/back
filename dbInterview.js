const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    email:{
        type:'string',
        required:true,
    },
    batch:{type:'string',require:true},
     date:{type:'string',require:true},
     interviewTopic:{type:'string',require:true},
    marks:{type:'string',default:"Yet to Give"},
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('interview',userSchema);

module.exports={mongoose,usersModel}