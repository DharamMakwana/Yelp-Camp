require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()
const connectDB = require('./db/connect.js')
const CampSite = require('./models/campSite.js')
const testData = require('./test.json')

const start = async function() {
 try {
 await connectDB(process.env.MONGO_URI)
 await CampSite.create(testData)
 process.exit(0)
 } catch (e) {
   console.log(e)
 }
}

start()
