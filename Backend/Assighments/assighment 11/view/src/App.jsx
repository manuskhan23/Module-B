import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import * as routes from "./utils/index";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    axios.get(routes.getAllTodosURL).then((response) => {
      setTodoItems(response.data.todoItems);
    });
  }, []);

  const handleNewItem = (itemName, itemDueDate) => {
    axios.post(routes.addTodoURL, {
      tasks: itemName,
      date: itemDueDate,
    }).then((response) => {
      setTodoItems((prev) => [...prev, response.data.todoItem]);
    });
  };

  const handleDeleteItem = (todoId) => {
    axios.delete(routes.deleteTodoURL.replace(":id", todoId)).then(() => {
      setTodoItems((prev) => prev.filter((item) => item._id !== todoId));
    });
  };

  const handleComplete = (todoId) => {
    axios.patch(routes.markTodoAsCompleteURL.replace(":id", todoId)).then((response) => {
      setTodoItems((prev) =>
        prev.map((item) =>
          item._id === todoId ? response.data.todoItem : item
        )
      );
    });
  };

  const handleUncheck = (todoId) => {
    axios.patch(routes.uncheckTodoURL.replace(":id", todoId)).then((response) => {
      setTodoItems((prev) =>
        prev.map((item) =>
          item._id === todoId ? response.data.todoItem : item
        )
      );
    });
  };

  const handleUpdate = (todoId, tasks, date) => {
    axios.put(routes.updateTodoURL.replace(":id", todoId), { tasks, date }).then((response) => {
      setTodoItems((prev) =>
        prev.map((item) =>
          item._id === todoId ? response.data.todoItem : item
        )
      );
    });
  };

  const handleDeleteAll = () => {
    axios.post(routes.deleteAllTodosURL).then(() => {
      setTodoItems([]);
    });
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage />}
      <TodoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
        onComplete={handleComplete}
        onUncheck={handleUncheck}
        onUpdate={handleUpdate}
      />
      {todoItems.length > 0 && (
        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
      )}
    </center>
  );
}

export default App;
