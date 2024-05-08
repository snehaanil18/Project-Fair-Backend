const projects = require('../Models/projectSchema')

exports.addProject = async (req, res) => {
    console.log('Inside addProject method');
    const { title, languages, github, livelink, overview } = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title, languages, github, livelink, overview, projectImage);
    console.log(userId);
    try {
        const existingProject = await projects.findOne({ github })
        console.log(existingProject);
        if (existingProject) {
            res.status(406).json("Project already exsists")
        }
        else {
            const newProject = new projects({
                title,
                languages,
                github,
                livelink,
                overview,
                projectImage,
                userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        res.status(500).json('Add Project failed..')
    }
}


//1. get a particular project details
exports.viewProject = async (req, res) => {
    console.log('Inside ViewProject method');
    const userId = req.payload
    console.log(userId);
    try {
        const existProjects = await projects.find({ userId })
        console.log(existProjects);
        if (existProjects) {
            res.status(200).json(existProjects)
        }
        else {
            res.status(401).json('database empty')
        }
    }
    catch {
        res.status(500).json('failed' + err)
    }
}


//2. get 3 project details for home page
exports.getHomeProjects = async (req, res) => {
    console.log('Inside Home Project');
    try {
        const homeProjects = await projects.find().limit(3)
        console.log(homeProjects);
        if (homeProjects) {
            res.status(200).json(homeProjects)
        }
        else {
            res.status(401).json('database empty')
        }
    }
    catch (err) {
        res.status(500).json('failed' + err)
    }
}

//3. get all project details
exports.viewAllProjects = async (req, res) => {
    console.log('Inside viewAllProjects method');
    const searchKey = req.query.search
    console.log(searchKey);
    //case sensitive
    const query = {
        languages: { $regex: searchKey, $options: "i" }
    }
    try {
        const allProjects = await projects.find(query)
        console.log(allProjects);
        if (allProjects) {
            res.status(200).json(allProjects)
        }
        else {
            res.status(401).json('database empty')
        }
    }
    catch (err) {
        res.status(500).json('failed' + err)
    }
}

exports.getAllUserProjects = async (req, res) => {

    const searchKey = req.query.search
    console.log(searchKey);

    let query = {};

    // Check if searchKey is provided
    if (searchKey) {
        query.languages = { $regex: searchKey, $options: "i" };
    }
    try {
        const AllUserProjects = await projects.find(query)
        if (AllUserProjects) {
            res.status(200).json(AllUserProjects)
        }
        else {
            res.status(401).json("Can't find project")
        }
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}


exports.deleteUserProject = async (req, res) => {
    const { pid } = req.params //get project id
    try {
        const deleteUserProject = await projects.findOneAndDelete({ _id: pid })
        //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
        res.status(200).json(deleteUserProject)
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}


exports.updateUserProject = async(req,res) => {
    console.log('Inside update method');
    const {title, languages, github, livelink, overview, projectImage} = req.body
    userId = req.payload
    const {pid} = req.params
    const updateImage = req.file?req.file.filename:projectImage
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title, languages, github, livelink, overview, projectImage:updateImage,userId})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}
