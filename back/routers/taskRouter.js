const Router = require('express')
const controller = require('../controllers/taskController');

const router = new Router();
const authMiddleWare = require('../middleware/authMiddleWare');

router.post('/createTask', authMiddleWare, controller.createTask);

router.get('/tasks', authMiddleWare, controller.getAllTasks);

router.get('/getCurrent/:id', authMiddleWare, controller.getCurrentTask);

router.delete('/delete/:id', authMiddleWare, controller.deleteTask);

router.put('/update/:id', authMiddleWare, controller.updateTask);

router.get('/getUserTasks/:username', authMiddleWare, controller.getUserTask);

router.get('/getDoneUserTasks/:username', authMiddleWare, controller.getUserDoneTasks);

router.get('/getNotCompletedTasks/:username', authMiddleWare, controller.getUserNotCompletedTasks);

module.exports = router;

