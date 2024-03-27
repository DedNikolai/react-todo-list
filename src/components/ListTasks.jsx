import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateAll, removeAll} from '../store/slice/todo';

function ListTasks() {
  const dispatch = useDispatch();
  const {todos} = useSelector(state => state.todo);

  // Mark all tasks as completed
  const handleCompleteAll = () => {
    const idArray = todos.map(todo => todo._id);
    dispatch(updateAll(idArray));
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    const idArray = todos.filter(item => item.isDone).map(todo => todo._id);
    dispatch(removeAll(idArray));
  };
    return (
        <div className="mid">
          <div className='mid_item'>
            <i className="fas fa-check-double"></i>
            <p id="complete-all" onClick={handleCompleteAll}>
              Complete all
            </p>
          </div>
          <div className='mid_item mid_item__block'>
            Delete all
          </div>
        </div>
    )
}

export default ListTasks;