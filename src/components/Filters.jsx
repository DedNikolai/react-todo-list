import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAll} from '../store/slice/todo';

function Filters({toggleDateFilter, date, setFilter}) {
    const {todos} = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const handleFilterByDate = () => {
        toggleDateFilter(true);
        dispatch(getAll({isDone: '', todoDate: date}));
    }

      // Handle filter change
    const handleFilterChange = (filterType, date) => {
        setFilter(filterType);
        toggleDateFilter(false);
        dispatch(getAll({isDone: filterType, todoDate: ''}));
    };


    return (
        <div className="filters">
        <div className="dropdown">
          <button className="dropbtn">Filter</button>
          <div className="dropdown-content">
            <a href="#" id="all" onClick={() => handleFilterChange('', '')}>
              All
            </a>
            <a href="#" id="rem" onClick={() => handleFilterChange(false, '')}>
              Uncompleted
            </a>
            <a href="#" id="com" onClick={() => handleFilterChange(true, '')}>
              Completed
            </a>
            <a href="#" id="date" onClick={handleFilterByDate}>
              Сurrent date
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
    )
};

export default Filters;