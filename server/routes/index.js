const Router = require('express');
const userRouter = require('./user');
const taskRouter = require('./task')

const router = Router();

router.use('/user', userRouter);
router.use('/task', taskRouter);

module.exports = router;