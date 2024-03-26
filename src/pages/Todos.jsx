import React, { useState, useEffect, useMemo } from 'react';
import todoImage from "../image/todo.png";
import {useSelector, useDispatch} from 'react-redux';
import {getAll, create, update} from '../store/slice/todo';
import TodoList from '../components/TodoList';
import moment from 'moment';
import CustomPagination from '../components/CustomPagination';
import Filters from '../components/Filters';
import ListTasks from '../components/ListTasks';
import Loader from '../components/Loader';

const Todos = () => {
  // State variables
  const [inputValue, setInputValue] = useState(''); // Holds the value of the input field
  const [filter, setFilter] = useState(''); // Holds the current filter type
  const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited
  const {todos, todosLoading} = useSelector(state => state.todo);
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [date, setDate] = useState(currentDate);
  const [isDateFilter, toggleDateFilter] = useState(false)
  const dispatch = useDispatch();

  // Fetch initial data
  useEffect(() => {
    dispatch(getAll({isDone: filter, todoDate: ''}));
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Add a new task
  const handleAddTask = async () => {
    dispatch(create({text: inputValue, todoDate: date}));  
    setInputValue('');
  };


  // Update a task
  const handleUpdateTask = () => {
    const todo = todos.find(item => item._id === editTaskId);
    const {_id, isDone} = todo;
    dispatch(update({text: inputValue, _id, isDone}));
    setInputValue('');
    setEditTaskId(null);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  }

  // Filter tasks based on the selected filter
  const filteredTasks = useMemo(() => {
    return todos.filter((task) => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'completed') {
        return task.isDone;
      } else if (filter === 'uncompleted') {
        return !task.isDone;
      }
      return true;
    }); 
  }, [todos])

  if (todosLoading) return <Loader />

  // Render the todo list
  return (
    <div className="container">
      <div className="todo-app">
        <div className='header'>
          <h2>
            <img src={todoImage} alt="todo-image" /> Todo List
          </h2>
          <div className="row">
            <input
              type="date"
              id='date'
              className="add-task"
              value={date}
              onChange={handleChangeDate}
            />
          </div>
        </div>
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
        <ListTasks />
        <TodoList 
          todos={filteredTasks}
          setValue={setInputValue}
          setId={setEditTaskId}
         />
        <CustomPagination 
          date={date}
          isDateFilter={isDateFilter}
          filter = {filter}
        />
        <Filters 
          date={date}
          toggleDateFilter={toggleDateFilter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
};

export default Todos;
