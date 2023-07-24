var express = require("express");
var router = express.Router();
const { mongoose, usersModel } = require("../dbInterview");
const { mongodb, dbName, dbUrl, MongoClient } = require("../dbConfig");
const { render } = require("jade");
const { token } = require("morgan");
const client = new MongoClient(dbUrl);
const {
  hashPassowrd,
  hashCompare,
  createToken,
  jwtDecode,
  validate,
  authenticate,
} = require("../auth");

//create task and send to db
router.post("/sendInterviewData", async (req, res) => {
  try {
    let newUser = await usersModel.create(req.body);
    res.send({
      statusCode: 200,
      message: "Task Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 200, message: "Internal Server Error", error });
  }
});


router.get("/getInterviewData", async (req, res) => {
  try {
    let users = await usersModel.find();
    // console.log(users, "1");
    res.send({
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.get('/UpInterviewMark/:id',async(req,res)=>{
  try {
    let user = await usersModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    // console.log(user)
    if(user)
    {
      res.send(user)
      }
    else
      res.send({statusCode:400,message:"User does not exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.put('/UpInterviewMark/:id',async(req,res)=>{
  try {
    let user = await usersModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    // console.log(user)
    if(user)
    {
       user.batch = req.body.batch
       user.date =req.body.date
      user.email =req.body.email
      user.interviewTopic =req.body.interviewTopic
      user.marks =req.body.marks
      await user.save()
      res.send({statusCode:200,message:"User data saved successfully"})
      }
    else
      res.send({statusCode:400,message:"User does not exists"})
  } catch (error) {
    console.log(error)
    res.send({statusCode:400,message:"Internal Server Error",error})
  }
})

router.get("/getInterviewDataStud", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);

    let users = await usersModel.find({email: data.email,});
    // console.log(users, "1");
    if (users){
    res.send({
      statusCode: 200,
      data: users,
    });}
    else{
      res.send({statusCode:400,message:"Interview yet to assign"})
    }
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.get("/getNoOFIntSchedu", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let users = await usersModel.find({email:data.email});
    console.log(users,users.length)
    res.send({
      statusCode: 200,
      interview: users.length,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});
module.exports = router;
