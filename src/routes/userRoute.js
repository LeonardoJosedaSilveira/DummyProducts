const express = require('express');
const userController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

const userRouter = express.Router();

userRouter.post('/register', userController.createNewUser);
userRouter.post('/login', loginController.newLogin);

module.exports = userRouter;
