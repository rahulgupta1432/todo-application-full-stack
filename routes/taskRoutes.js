const express = require('express');
const router = express.Router();
const taskController = require("../controller/taskController");
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/dashboard', ensureAuthenticated, taskController.getAllTasks);
router.post('/tasks', ensureAuthenticated, taskController.createTask);
router.post('/tasks/:id/update', ensureAuthenticated, taskController.updateTask);
router.post('/tasks/:id/delete', ensureAuthenticated, taskController.deleteTask);
router.post('/tasks/:id/toggle', ensureAuthenticated, taskController.toggleTaskCompletion);

module.exports = router;
