// 1. Import mongoose
const mongoose = require('mongoose')

//2. Schema creation
const projectScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true,
        unique:true
    },
    livelink:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const projects = mongoose.model('Projects',projectScheme)

module.exports = projects