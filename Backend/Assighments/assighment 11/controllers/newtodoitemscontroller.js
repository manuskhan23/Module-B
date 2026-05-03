const TodoItem = require("../models/Todoitem");

exports.createTodoItem = async (req, res, next) => {
  const { tasks, date } = req.body;
  const todoItem = new TodoItem({
    tasks,
    date,
  });
  try {
    const result = await todoItem.save();
    res.status(201).json({
      todoItem: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating todo item"
    });
  }
};

exports.getTodoItems = async (req, res, next) => {
  try {
    const todoItems = await TodoItem.find();
    res.status(200).json({
      todoItems
    });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error fetching todo items"
      });
    }
};

exports.markTodoItemAsComplete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findById(id);
    if (!todoItem) {
      return res.status(404).json({
        message: "Todo item not found"
      });
    }
    todoItem.completed = !todoItem.completed;
    const result = await todoItem.save();
    res.status(200).json({
      todoItem: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error marking todo item as complete"
    });
  }
};

exports.deleteTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await TodoItem.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: "Todo item not found"
      });
    }
    res.status(200).json({
      message: "Todo item deleted successfully"
    });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error deleting todo item"
      });
    }
};

exports.updateTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tasks, date } = req.body;
    const todoItem = await TodoItem.findById(id);
    if (!todoItem) {
      return res.status(404).json({ 
        message: "Todo item not found"
      });
    }
    todoItem.tasks = tasks || todoItem.tasks;
    todoItem.date = date || todoItem.date;
    const result = await todoItem.save();
    res.status(200).json({
      todoItem: result
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating todo item"
    });
  }
};

exports.deleteAllTodoItems = async (req, res, next) => {
  try {
    await TodoItem.deleteMany({});
    res.status(200).json({
      message: "All todo items deleted successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting all todo items"
    });
  }
}

exports.uncheckSpecificCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findById(id);
    if (!todoItem) {
      return res.status(404).json({
        message: "Todo item not found"
      });
    }
    todoItem.completed = false;
    const result = await todoItem.save();
    res.status(200).json({
      todoItem: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error unchecking todo item"
    });
  }
};