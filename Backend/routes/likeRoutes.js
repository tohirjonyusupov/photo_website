const express = require('express')
const { like, getLikes } = require('../controllers/likeController')
const likeRouter = express.Router()

likeRouter.post('/', like)

module.exports = likeRouter