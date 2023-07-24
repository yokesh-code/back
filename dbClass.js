const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
   
    
    batch:{type:'string',require:true},
     date:{type:'string',require:true},
     topic:{type:'string',require:true},
    meetLink:{type:'string',require:true},
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('class',userSchema);

module.exports={mongoose,usersModel}