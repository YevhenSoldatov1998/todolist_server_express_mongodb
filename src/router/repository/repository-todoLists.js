const mongoose = require('mongoose');

const todoLists = new mongoose.Schema({
    title: String,
    addedDate: String,
    order: Number
});
const TodoLists = mongoose.model('todolists', todoLists);
const getTodoLists = async () => {
    const todoLists = await TodoLists.find();
    return todoLists
}
const addTodoLists = async (title) => {
    let addedDate = new Date().toJSON()
    const todoLists = new TodoLists({title, addedDate, order: 0});
    await todoLists.save()
    return todoLists

}
const deleteTodoList = async (todoListId) => {
    return await TodoLists.deleteOne({_id: todoListId})

}

exports.getTodoLists = getTodoLists;
exports.addTodoLists = addTodoLists;
exports.deleteTodoList = deleteTodoList;