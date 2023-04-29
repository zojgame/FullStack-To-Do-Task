const Router = require('express')
const controller = require('../controllers/TaskController');

const router = new Router();
const authMiddleWare = require('../middleware/authMiddleWare');

router.post('/createTask', authMiddleWare, controller.createTask);

router.get('/tasks', authMiddleWare, controller.getAllTasks);

router.get('/getCurrent/:id', authMiddleWare, controller.getCurrentTask);

router.delete('/delete/:id', authMiddleWare, controller.deleteTask);

router.put('/update/:id', authMiddleWare, controller.updateTask);

router.get('/getUserTasks/:username', authMiddleWare, controller.getUserTask);

module.exports = router;

