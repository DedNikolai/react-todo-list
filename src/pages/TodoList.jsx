import React, { useState, useEffect } from 'react';
import todoImage from "../image/todo.png";
import {useSelector, useDispatch} from 'react-redux';
import {getAll, create, update, remove} from '../store/slice/todo';
import Loader from '../components/Loader';

const TodoList = () => {
  // State variables
  const [inputValue, setInputValue] = useState(''); // Holds the value of the input field
  const [filter, setFilter] = useState('all'); // Holds the current filter type
  const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited
  const {todos, todosLoading} = useSelector(state => state.todo);
  const dispatch = useDispatch();

  // Fetch initial data
  useEffect(() => {
    dispatch(getAll());
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Add a new task
  const handleAddTask = async () => {
    dispatch(create({text: inputValue}));
  };

  // Handle checkbox change for a task
  const handleTaskCheckboxChange = (taskId) => {
    const todo = todos.find(item => item._id === taskId);
    const {_id, text} = todo;
    dispatch(update({text, _id, isDone: !todo.isDone}));
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    dispatch(remove(taskId))
  };

  // Edit a task
  const handleEditTask = (taskId) => {
    const todo = todos.find(item => item._id === taskId);
    setInputValue(todo.text);
    setEditTaskId(taskId);
  };

  // Update a task
  const handleUpdateTask = () => {
    const todo = todos.find(item => item._id === editTaskId);
    const {_id, isDone} = todo;
    dispatch(update({text: inputValue, _id, isDone}));
    setInputValue('');
    setEditTaskId(null);
  };

  // Mark all tasks as completed
  const handleCompleteAll = () => {

  };

  // Clear completed tasks
  const handleClearCompleted = () => {
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = todos.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.isDone;
    } else if (filter === 'uncompleted') {
      return !task.isDone;
    }
    return true;
  });

  // Display loading message while data is being fetched
  if (todosLoading) {
    return <Loader />;
  }

  // Render the todo list
  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          <img src={todoImage} alt="todo-image" /> Todo List
        </h2>
        <div className="row">
          <i className="fas fa-list-check"></i>
          <input
            type="text"
            className="add-task"
            id="add"
            placeholder="Add your todo"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
          />
          <button id="btn" onClick={editTaskId ? handleUpdateTask : handleAddTask}>
            {editTaskId ? 'Update' : 'Add'}
          </button>
        </div>

        <div className="mid">
          <i className="fas fa-check-double"></i>
          <p id="complete-all" onClick={handleCompleteAll}>
            Complete all tasks
          </p>
          <p id="clear-all" onClick={handleClearCompleted}>
            Delete comp tasks
          </p>
        </div>

        <ul id="list">
          {filteredTasks.map((task) => (
            <li key={task._id}>
              <input
                type="checkbox"
                id={`task-${task._id}`}
                data-id={task.id}
                className="custom-checkbox"
                checked={task.isDone}
                onChange={() => handleTaskCheckboxChange(task._id)}
              />
              <label htmlFor={`task-${task._id}`}>{task.text}</label>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                  className="edit"
                  data-id={task._id}
                  onClick={() => handleEditTask(task._id)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                  className="delete"
                  data-id={task._id}
                  onClick={() => handleDeleteTask(task._id)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="filters">
          <div className="dropdown">
            <button className="dropbtn">Filter</button>
            <div className="dropdown-content">
              <a href="#" id="all" onClick={() => handleFilterChange('all')}>
                All
              </a>
              <a href="#" id="rem" onClick={() => handleFilterChange('uncompleted')}>
                Uncompleted
              </a>
              <a href="#" id="com" onClick={() => handleFilterChange('completed')}>
                Completed
              </a>
            </div>
          </div>

          <div className="completed-task">
            <p>
              Completed: <span id="c-count">{todos.filter((task) => task.isDone).length}</span>
            </p>
          </div>
          <div className="remaining-task">
            <p>
              <span id="total-tasks">
                Total Tasks: <span id="tasks-counter">{todos.length}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
