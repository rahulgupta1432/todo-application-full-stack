const Task = require('../models/TaskModel');

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.render('tasks/dashboard', { tasks });
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({ title, description, userId: req.user.id });
        res.redirect('/dashboard');
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        await Task.update({ title, description, completed }, { where: { id, userId: req.user.id } });
        res.redirect('/dashboard');
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Task.destroy({ where: { id, userId: req.user.id } });
        res.redirect('/dashboard');
    } catch (error) {
        next(error);
    }
};

exports.toggleTaskCompletion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        task.completed = !task.completed;
        await task.save();
        res.redirect('/dashboard');
    } catch (error) {
        next(error);
    }
};
