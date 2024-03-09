import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAll} from '../store/slice/todo';
import ReactPaginate from 'react-paginate';

function CustomPagination({filter, isDateFilter, date}) {
    const dispatch = useDispatch();
    const {totalPages = 0, currentPage = 1} = useSelector(state => state.todo);

    const handlePageClick = (value) => {
        dispatch(getAll({isDone: filter, todoDate: isDateFilter ? date : '', page: value.selected + 1}));
      }
    
    return (
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />    
    )
}

export default CustomPagination;