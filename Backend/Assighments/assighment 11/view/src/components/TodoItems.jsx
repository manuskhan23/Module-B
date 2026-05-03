import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems, onDeleteClick, onComplete, onUncheck, onUpdate }) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <TodoItem
          key={item._id}
          todoId={item._id}
          todoDate={item.date}
          todoName={item.tasks}
          completed={item.completed}
          onDeleteClick={onDeleteClick}
          onComplete={onComplete}
          onUncheck={onUncheck}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoItems;
