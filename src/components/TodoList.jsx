import React, { useMemo, useState, useEffect, memo } from 'react';
import todoImage from "../image/todo.png";
import {useSelector, useDispatch} from 'react-redux';
import {getAll, create, update, remove, updateAll, removeAll} from '../store/slice/todo';
import Loader from '../components/Loader';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

function TodoList({todos, setValue, setId}) {
    const dispatch = useDispatch();
    const {todosLoading} = useSelector(state => state.todo);  

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
        setValue(todo.text);
        setId(taskId);
    };

    // Display loading message while data is being fetched
    if (todosLoading) {
        return <Loader />;
    }

    return (
        <ul id="list">
            {todos.map((task) => (
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
    )
}

export default memo(TodoList);