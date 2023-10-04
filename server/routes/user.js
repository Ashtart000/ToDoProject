const { Router } = require('express');
const UserController = require('../controllers/User.Controller');
const userRouter = Router();

userRouter.post('/sign-up', UserController.registrationUser); // register
userRouter.post('/sign-in', UserController.loginUser); // login

module.exports = userRouter;