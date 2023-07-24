const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    batch:{type:'string',required:true},
    task:{type:'string',require:true},
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('task',userSchema);

module.exports={mongoose,usersModel}