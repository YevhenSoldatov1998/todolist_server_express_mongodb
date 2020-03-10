const express = require('express');
const router = express.Router();
const dal = require('./repository/repository-todoLists');
const repTasks = require('./repository/repository-tasks')
// todoLists
router.get('/', async (req, res) => {
    try {
        const todoLists = await dal.getTodoLists();
        res.status(200).send({
            items: todoLists
        })
    } catch (e) {
        res.status(404).send({
            message: e
        })
    }

})
router.post('/', async (req, res) => {
    try {
        const todolist = await dal.addTodoLists(req.body.title)
        res.status(200).json({
            resultCode: 0,
            data: {
                item: todolist
            }
        })
    } catch (e) {
        res.status(404).send({
            resultCode: 1,
            message: e
        })
    }
})
router.delete('/:todoListId', async (req, res) => {
    try {
        const todoListId = req.params.todoListId;
        await dal.deleteTodoList(todoListId);
        await repTasks.deleteMany(todoListId);
        res.status(200).send({resultCode: 0})
    } catch (e) {
        res.status(404).send({resultCode: 1, message: e})
    }
});

// tasks
router.get('/:todoListId/tasks', async (req, res) => {
    try {
        const todoListId = req.params.todoListId;
        const gotTasks = await repTasks.getTasks(todoListId);

        res.send({
            items: gotTasks,
            totalCount: gotTasks.length,
            error: null
        });
    }
    catch (e) {
        res.status(404).send({
            error: e,
            message: 'some error get tasks'
        })
    }

})
router.post('/:todoListId/tasks', async (req, res) => {
    try {
        const todoListId = req.params.todoListId;
        const title = req.body.title;
        let task = await repTasks.addTasks(title, todoListId);
        res.status(200).send({
            resultCode: 0,
            message: 'tasks added',
            item: task
        })

    } catch (e) {
        res.status(404).send({
            resultCode: 1,
            message: e
        })
    }
})
router.delete('/:todoListId/tasks/:taskId' , async (req, res) => {
    try{
        const todoListId = req.params.todoListId;
        const taskId = req.params.taskId;
        await repTasks.deleteOne(taskId);
        res.send({
            resultCode: 0,
            request: 'success'
        })
    }
    catch (e) {
        res.send({
            resultCode: 1,
            request: 'failed'
        })
    }

})
router.put('/:todoListId/tasks/:taskId' , async (req, res) => {
    try{
        const taskId = req.params.taskId;
        const todoListId = req.params.todoListId;
        const items = req.body;
        await repTasks.updateTasks(taskId, items);
        const result = await repTasks.getTasks(todoListId)
        res.send({
            resultCode: 0,
            item: result
        })
    }
    catch (e) {
        res.send({
            resultCode: 1,
            request: 'failed'
        })
    }

})
module.exports = router;