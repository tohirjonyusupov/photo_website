
const express = require("express");
const { login, signUp, user } = require("../controllers/userController");
const userRouter = express.Router()

userRouter.get('/:id', user)
userRouter.post('/login', login);
userRouter.post('/signUp', signUp);

module.exports = userRouter