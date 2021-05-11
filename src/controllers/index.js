const express = require('express')
const characterRoutes = require('./character.js')
const userRoutes = require('./user.js')

const router = express.Router()

router.use('/characters', characterRoutes)
router.use('/users', userRoutes)

module.exports = router