const mongoose = require('mongoose');

const tasks = new mongoose.Schema({
    description: String,
    title: String,
    completed: {type: Boolean, default: false},
    status: {type: Boolean, default: false},
    priority: {type: Number, default: 0},
    startDate: Date,
    deadline: String,
    todoListId: String,
    order: Number,
    addedDate: Date
});
const Tasks = mongoose.model('tasks', tasks);
const deleteMany = async (todoListId) => {
    return await Tasks.deleteMany({"todoListId": todoListId})
}
const deleteOne = async (tasksId) => {
    return await Tasks.deleteOne({"_id": tasksId})
}
const getTasks = async (todoListId) => {
    const tasks = Tasks.find({"todoListId": todoListId});
    return tasks
}
const addTasks = async (title, todoListId) => {
    const tasks = new Tasks({description: null, title, todoListId,})
    await tasks.save()
    return tasks
}
const updateTasks = async (taskId, items) => {
    try {
        return await Tasks.updateOne({"_id": taskId}, {
            $set: {...items}
        })
    } catch (e) {

    }
}

exports.deleteMany = deleteMany;
exports.deleteOne = deleteOne;
exports.getTasks = getTasks;
exports.addTasks = addTasks;
exports.updateTasks = updateTasks;