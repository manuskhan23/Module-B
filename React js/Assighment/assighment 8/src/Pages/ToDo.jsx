import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import TodoInput from '../components/Todo-Input'
import styles from '../styles/ToDo.module.css'

function ToDo() {
  const navigate = useNavigate()
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [completed, setCompleted] = useState(new Set())

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task])
      setTask('')
      Swal.fire({
        title: 'Added!',
        text: 'Task added successfully',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false
      })
    } else {
      Swal.fire({
        title: 'Oops!',
        text: 'Please enter a task',
        icon: 'warning',
        confirmButtonColor: '#667eea'
      })
    }
  }

  const deleteTask = (index) => {
    Swal.fire({
      title: 'Delete Task?',
      text: `Are you sure you want to delete "${tasks[index]}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((_, i) => i !== index))
        setCompleted(new Set([...completed].filter(i => i !== index)))
        Swal.fire('Deleted!', 'Task has been deleted.', 'success')
      }
    })
  }

  const toggleComplete = (index) => {
    const newCompleted = new Set(completed)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompleted(newCompleted)
  }

  const startEdit = (index) => {
    Swal.fire({
      title: 'Edit Task',
      input: 'text',
      inputValue: tasks[index],
      inputPlaceholder: 'Enter updated task',
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#6b7280',
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return 'Task cannot be empty!'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newTasks = [...tasks]
        newTasks[index] = result.value.trim()
        setTasks(newTasks)
        Swal.fire({
          title: 'Success!',
          text: 'Task updated successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.todoWrapper}>
        <div className={styles.header}>
          <h1>My Tasks</h1>
          <p>Stay organized and productive</p>
        </div>
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <TodoInput 
              onChange={(e) => setTask(e.target.value)} 
              value={task}
              onKeyPress={handleKeyPress}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          {tasks.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            <>
              <div className={styles.todoList}>
                {tasks.map((task, index) => (
                  <div 
                    key={index} 
                    className={`${styles.todoItem} ${completed.has(index) ? styles.completed : ''}`}
                  >
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      checked={completed.has(index)}
                      onChange={() => toggleComplete(index)}
                    />
                    <span className={styles.todoText}>{task}</span>
                    <div className={styles.actions}>
                      <button 
                        className={styles.editBtn}
                        onClick={() => startEdit(index)}
                      >
                        Edit
                      </button>
                      <button 
                        className={styles.deleteBtn}
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.label}>Total</div>
                  <div className={styles.value}>{tasks.length}</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.label}>Completed</div>
                  <div className={styles.value}>{completed.size}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ToDo
