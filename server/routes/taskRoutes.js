const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

router.route('/')
    .post(tasksController.createNewTasks)
    .patch(tasksController.updateTasks)
    .delete(tasksController.deleteTasks)

// to allow auth in body
router.route('/list')
    .post(tasksController.getAllTasks)
module.exports = router