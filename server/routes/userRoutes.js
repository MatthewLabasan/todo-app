const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .post(usersController.createNewUsers)
    .patch(usersController.updateUsers)
    .delete(usersController.deleteUsers)

router.route('/auth')
    .post(usersController.getUserInfo)

module.exports = router