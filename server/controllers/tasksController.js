const asyncHandler = require('express-async-handler') 
const Task = require('../models/Task')
const User = require('../models/User')

// @desc Create new task based on user info
// @route POST /tasks/list
const getAllTasks = asyncHandler(async(req, res) => {
    const { authToken } = req.body
    const user = await User.findOne({ authToken }).populate('tasks').exec()
    if (!user) {
        return res.status(400).json({ message: "Invalid authorization."})
    }
    const tasks = user.tasks
    console.log(tasks)
    return res.status(200).json({ tasks })
})

// @desc Create new task based on user info
// @route POST /tasks
const createNewTasks = asyncHandler(async(req, res) => {
    const { authToken, task } = req.body
    
    const existingUser = await User.findOne({ authToken })
    if(!existingUser) {
        return res.status(400).json({ message: `${username} does not exist.` }) 
    }
    if( !task | typeof task !== 'string' ) { 
        return res.status(400).json({ message: "Invalid task input provided." }) 
    }

    const newTaskObject = Task({task})
    const newTask = await Task.create(newTaskObject)
    // await User.updateOne({ authToken }, { $push: { tasks: newTaskObject }})  could call this instead of findOne and save()
    existingUser.tasks.push(newTask._id) // add task to user's list
    await existingUser.save()
    
    // where does asynhandler throw errors -> catches and prints as internal server error
    return res.status(201).json({ message: `${task} added to list.` })
})

// @desc Update a task based on taskID passed in
// @route PATCH /tasks
const updateTasks = asyncHandler(async(req, res) => { 
    const { authToken, taskID, completed } = req.body 

    
   await User.findOne(
        { 
            "authToken": authToken,
            "tasks": taskID // taskID gives specific task of this user, even if same tasks created
        },
    );
    
    return res.status(404).json({ message: `"${task}" marked complete` })
})

// @desc Delete a task
// @route DELETE /tasks
// @access Private (not implemented yet)
const deleteTasks = asyncHandler(async(req, res) => {
    const { authToken, taskID } = req.body

    const existingUser = await User.updateOne({ authToken }, { $pull: { tasks: taskID } })
    if (existingUser.modifiedCount == 1) { // remove from task db 
        await Task.deleteOne({ _id: taskID })
        return res.status(200).json({ message: "Task successfully removed." })
    } else {
        return res.status(400).json({ message: "Task not found and could not be deleted."})
    }
})


module.exports = {
    getAllTasks,
    createNewTasks,
    updateTasks,
    deleteTasks
}