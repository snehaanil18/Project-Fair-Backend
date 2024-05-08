// 1. import express
const express = require('express')

const userController = require("../Controllers/userController")

const projectController = require("../Controllers/projectController")
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
// 2. create router object of express to define path
const router = express.Router()

// 3. Register api call
router.post('/register',userController.register)

// 4. Login API call
router.post('/login',userController.login)

// Add Project API call
router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

//view all projects
router.get('/get-all-projects',jwtMiddleware,projectController.viewAllProjects)
router.get('/get-demo',jwtMiddleware,projectController.getAllUserProjects)
//get particular user project
router.get('/get-projects',jwtMiddleware,projectController.viewProject)

//get 3 projects
router.get('/home-projects',projectController.getHomeProjects)

//delete a project
router.delete('/delete-project/:pid',jwtMiddleware,projectController.deleteUserProject)

//update user project
router.put('/project/update-user-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProject)

module.exports = router
