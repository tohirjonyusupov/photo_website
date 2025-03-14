const express = require('express');
const { getPhotos, myPhoto, addPhoto, deletPhoto } = require('../controllers/photoController');
const { authentication } = require('../middleware/authentication');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const photoRouter = express.Router()


photoRouter.get('/', authentication, getPhotos)
photoRouter.get('/:id', authentication, myPhoto)
photoRouter.post('/addPhoto', authentication, uploadMiddleware, addPhoto)
photoRouter.delete('/deleteImg/:id', authentication, deletPhoto)

module.exports = photoRouter