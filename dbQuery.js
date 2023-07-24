const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    email:{
        type:'string',
        required:true,
    },
    batch:{type:'string',require:true},
    categories:{type:'string',require:true},
    status:{type:'string',default:"Send"},
    assign:{type:'string',default:"Yet to Assign"},
    date:{type:Date,default:Date.now()},
    link:{type:'string',default:"Yet to Send"},
    remarks:{type:'string',default:"Yet to Remark"},
    title:{type:'string',require:true},
    topic:{type:'string',require:true},
    description:{type:'string',require:true},
})

let usersModel = mongoose.model('query',userSchema);

module.exports={mongoose,usersModel}

