const express = require('express');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const tokenController = require('../controllers/tokenController')

const userRouter = express.Router();

userRouter.post('/register', userController.createNewUser);
userRouter.post('/login', loginController.newLogin);
userRouter.put('/update', tokenController.checkUser, userController.updateSaleStatus)

module.exports = userRouter;
