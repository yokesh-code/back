var express = require("express");
var router = express.Router();
const { mongoose, usersModel } = require("../dbQuery");
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


router.post("/queryData", async (req, res) => {
  console.log("a")
  try {
    console.log("1")
        let token = req.headers.authorization.split(" ")[1];
        let data = await jwtDecode(token);
    console.log(data,"2")
        const body = {
            email: data.email,
            categories: req.body.categories,
            title: req.body.title,
            topic: req.body.topic,
            description: req.body.description,
            batch: data.batch
          };
          console.log(body)
          let newUser = await usersModel.create(body);
      res.send({
        statusCode: 200,
        message: "Task Added Successfully",
      });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 200, message: "Internal Server Error", error });
  }
});

router.get("/getQueryData", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
   console.log(data,"1")
    let users = await usersModel.find({ email: data.email });
   console.log(users)
    res.send({
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.get("/getQueryStaffData", async (req, res) => {
  try {
    let users = await usersModel.find();
   console.log(users)
    res.send({
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});

router.get('/getQueryPutData/:id',async(req,res)=>{
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

router.put('/putQueryData/:id',async(req,res)=>{
  try {
    let user = await usersModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    // console.log(user)
    if(user)
    {   
       user.link =req.body.link
      user.status =req.body.status
      user.assign =req.body.assign
      user.remarks =req.body.remarks

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

router.get("/getNoOfQueryRaised", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let users = await usersModel.find({email:data.email});
    console.log(users,users.length)
    res.send({
      statusCode: 200,
      query: users.length
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 401, message: "Internal Server Error", error });
  }
});
module.exports = router;
