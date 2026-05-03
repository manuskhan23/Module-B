const coreURL = "https://mern-todo-app-two-taupe.vercel.app";

const addTodoURL = `${coreURL}/api/createtodos`;
const getAllTodosURL = `${coreURL}/api/showtodos`;
const markTodoAsCompleteURL = `${coreURL}/api/completetodos/:id/complete`;
const deleteTodoURL = `${coreURL}/api/deletetodos/:id`;
const updateTodoURL = `${coreURL}/api/updatetodos/:id`;
const deleteAllTodosURL = `${coreURL}/api/deletealltodos`;
const uncheckTodoURL = `${coreURL}/api/unchecktodos/:id`;

export {
  addTodoURL,
  getAllTodosURL,
  markTodoAsCompleteURL,
  deleteTodoURL,
  updateTodoURL,
  deleteAllTodosURL,
  uncheckTodoURL,
};