import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setPrevPage, setNextPage } from '../actions/users'

const Pagination = () => {
    const dispatch = useDispatch();

    const pageCount = useSelector((state) => state.users.pageCount);
    const currentPage = useSelector((state) => state.users.currentPage);

    var pageArr = [];
    for (let i = 1; i <= pageCount; i++) {
        pageArr.push(i);
    }
    
    const handlePrev = () => {
        dispatch(setPrevPage());
    }

    const handleNext = () => {
        dispatch(setNextPage());
    }

    const handlePageClick = (index) => {
        dispatch(setCurrentPage(index+1));
    }

    return (
        <div className="container">
            <ul className="pagination justify-content-end">
                <li 
                    onClick={handlePrev}
                    className={(currentPage===1 ? "page-item disabled" : "page-item" )}><a className="page-link" tabIndex="-1">
                    Previous</a></li>
                {pageArr.map((page, index) => (
                    <li key={index}
                        onClick={() => handlePageClick(index)} 
                        className={(currentPage-1===index ? "page-item active" : "page-item" )}><a className="page-link">
                        {page}</a></li>
                ))}
                <li 
                    onClick={handleNext}
                    className={(currentPage===pageCount ? "page-item disabled" : "page-item" )}><a className="page-link" tabIndex="-1">
                    Next</a></li>
            </ul>
        </div>
    )
}

export default Pagination;