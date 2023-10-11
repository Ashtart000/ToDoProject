const { Router } = require('express');
const UserController = require('../controllers/User.Controller');
const { checkToken } = require('../middlewares/checkToken');
const userRouter = Router();

userRouter.post('/sign-up', UserController.registrationUser); // register
userRouter.post('/sign-in', UserController.loginUser); // login
userRouter.get('/', checkToken, UserController.checkAuth);
userRouter.post('/refresh', UserController.refreshSession);

module.exports = userRouter;