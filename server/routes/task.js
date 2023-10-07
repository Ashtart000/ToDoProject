const Router = require('express');
const TaskController = require('../controllers/Task.Controller');
const { checkToken } = require('../middlewares/checkToken');

const taskRouter = Router();

taskRouter.post('/', checkToken, TaskController.createUserTask);
taskRouter.get('/', checkToken, TaskController.getAllUserTasks);

module.exports = taskRouter;