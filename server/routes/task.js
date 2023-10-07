const Router = require('express');
const TaskController = require('../controllers/Task.Controller');

const taskRouter = Router();

taskRouter.post('/', TaskController.createUserTask);
taskRouter.get('/:userId', TaskController.getAllUserTasks);

module.exports = taskRouter;