const express = require('express')
const { readToken } = require('../config')
const router = express.Router()
const { paketController } = require('../controller')

router.post('/add-data', paketController.addData)
router.post('/pengiriman', paketController.addPengiriman)
router.post('/addStatus', readToken, paketController.addStatusPengiriman)
router.get('/lacak', paketController.lacakPengiriman)


module.exports = router