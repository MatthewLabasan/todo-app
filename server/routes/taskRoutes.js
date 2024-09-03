const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

router.route('/')
    .get(tasksController.getAllTasks)
    .post(tasksController.createNewTasks)
    .patch(tasksController.updateTasks)
    .delete(tasksController.deleteTasks)

module.exports = router