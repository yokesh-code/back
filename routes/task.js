var express = require("express");
var router = express.Router();
const { mongoose, usersModel } = require("../dbTask");
const { mongodb, dbName, dbUrl,MongoClient } = require("../dbConfig");



const { render } = require("jade");
const { token } = require("morgan");
const client = new MongoClient(dbUrl)
const {
    hashPassowrd,
    hashCompare,
    createToken,
    jwtDecode,
    validate,
    authenticate
  } = require("../auth");

//create task and send to db
router.post("/taskSend", async (req, res) => {
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

//get task data
router.get('/getTaskData',validate,async(req,res)=>{

    try {

      let token = req.headers.authorization.split(" ")[1];
      let data = await jwtDecode(token);
     

      let users = await usersModel.find({batch:data.batch})
      
      res.send({
        statusCode:200,
        task:users
      })
      


} catch (error) {
  console.log(error);
  res.send({ statusCode: 401, message: "Internal Server Error", error });
}
   })



module.exports = router;
