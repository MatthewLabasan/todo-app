const asyncHandler = require('express-async-handler') 
const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto');

// @desc Get user info
// @route GET /users
// @access Private (not implemented yet)
const getAllUsers = asyncHandler(async(req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await User.findOne({ username, password: hashedPassword })

    if (!user) {
        return res.status(400).json({ message: "No user found." })  
    }  
    return res.status(200).json({ tasks: user.tasks }) 
})

// @desc Create new user
// @route POST /users
// For subscribing handling
const createNewUsers = asyncHandler(async(req, res) => {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({ message: "Username taken."}) 
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const authToken = crypto.randomBytes(32).toString('hex'); // Generates auth token
    const userObject = User({ username, password: hashedPassword, authToken })
    const user = await User.create(userObject)
    return res.status(200).json({ message: `Account created for ${username}.`})

})

// @desc Update a user
// @route PATCH /users
// For unsubscribing from keywords
const updateUsers = asyncHandler(async(req, res) => {
    res.status(405).json({ message: "Updating users not implemented."})
})

// @desc Delete a user
// @route DELETE /users
// @access Private (not implemented yet)
const deleteUsers = asyncHandler(async(req, res) => {
    res.status(405).json({ message: "Deleting users not implemented."})
})


module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}