const express = require('express')
const router = express.Router()
const { readToken } = require('../config')
const { userController } = require('../controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/keep', readToken, userController.keepLogin)
router.get('/get', userController.getUsers)
router.post('/addKurir', userController.addKurir)

module.exports = router
