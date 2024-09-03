const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    authToken: {
        type: String,
        required: true
    },
    tasks: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
        required: true,
        default: [] // no tasks
    }
})

module.exports = mongoose.model('User', userSchema)