const mongodb = require('mongodb')
const dbName = 'ticketingSystem'
const dbUrl = `mongodb://localhost:27017/${dbName}`
const MongoClient=mongodb.MongoClient
module.exports ={mongodb,dbName,dbUrl,MongoClient}