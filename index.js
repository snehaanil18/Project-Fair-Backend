// 1. Loads .env file contents into process.env by default
require('dotenv').config()

// 2. import express
const express = require('express')
// 3. import cors
const cors = require('cors')
// 7. import DB
const db = require('./DB/connection')

const router = require('./Routes/router')

// const applicationMiddleware = require('./Middlewares/applicationMiddleware')

// 4. create a application using express
const pfServer = express()

// 5. use
pfServer.use(cors())
pfServer.use(express.json())

//9
// pfServer.use(applicationMiddleware)
pfServer.use(router)

//used to export image from backend
pfServer.use('/uploads',express.static('./uploads'))

// 6. port creation
const PORT = 4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`PfServer Listening on port `+PORT);
})

pfServer.get('/',(req,res)=>{
    res.send("Welcome to Project-fair")
})