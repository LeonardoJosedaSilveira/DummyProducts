const express = require('express');
const userControler = require('../controllers/userControler');

const userRouter = express.Router();

userRouter.post('/register', userControler.createNewUser);

module.exports = userRouter;
