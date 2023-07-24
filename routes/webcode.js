var express = require("express");
var router = express.Router();
const { mongoose, usersModel } = require("../dbWebcode");
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
router.post("/sendWebcodeData", async (req, res) => {
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


router.get("/getWebcodeData", async (req, res) => {
  try {
    let users = await usersModel.find();
    console.log(users, "1");
    res.send({
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.get('/getWebData/:id',async(req,res)=>{
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

router.put('/updateWebMarks/:id',async(req,res)=>{
  try {
    let user = await usersModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    // console.log(user)
    if(user)
    {   
       user.webcodeTask =req.body.webcodeTask
      user.webcodeSolution =req.body.webcodeSolution
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


//Student
router.get("/getStudWebData", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let users = await usersModel.find({email:data.email});
    // console.log(users, "1");
    res.send({
      statusCode: 200,
      WebTaskSol: users,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.get("/block/:eTask", async (req, res) => {
  try {
      let token = req.headers.authorization.split(" ")[1];
      let data = await jwtDecode(token);
    let newUser = await usersModel.find({
      "email": data.email,
      "webcodeTask": req.params.eTask
    });
    res.send({
      statusCode: 200,
      blockData:newUser[0]
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.put("/sendWebSolu", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let users = await usersModel.findOne({email:data.email, webcodeTask:req.body.webcodeTask});
    // console.log(users, "1");
    if(users) {
      users.webcodeSolution = req.body.webcodeSolution
     await users.save()
     res.send({statusCode:200,message:"User data saved successfully"})
     }
   else
     res.send({statusCode:400,message:"User does not exists"})
   
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});


router.get("/getNoOfWebSolved", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let users = await usersModel.find({email:data.email,webcodeSolution:"Yet to submit"});
    console.log(users,users.length)
    res.send({
      statusCode: 200,
      webcode: users.length
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.put("/sendWeboSolu", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let newUser = await usersModel.findOne({email:data.email,webcodeTask:req.body.webcodeTask});
   
    if(newUser){  
      newUser.webcodeSolution =req.body.webcodeSolution
      await newUser.save()}
    res.send({
      statusCode: 200,
      message: "Task Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 200, message: "Internal Server Error", error });
  }
});

router.get("/getMapTask", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let users = await usersModel.find({email:data.email});
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

router.get("/getMapTable", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let users = await usersModel.find({email:data.email});
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
module.exports = router;
