const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    email:{
        type:'string',
        required:true,
    },
    batch:{type:'string',require:true},
    webcodeTask:{type:'string',require:true},
    webcodeSolution:{type:'string',default:"Yet to submit"},
    marks:{type:'string',default:"Yet to Give"},
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('Webcode',userSchema);

module.exports={mongoose,usersModel}