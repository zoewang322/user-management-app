import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchUsers, getUsers } from '../actions/users'

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();

    const handleSearchInput = (e) => {
        e.preventDefault();
        setKeyword(e.target.value);
        // console.log(keyword);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(searchUsers(keyword));
    }

    const handleSearchReset = (e) => {
        e.preventDefault();
        dispatch(getUsers());
    }

    return (
        <div className="container">
            <form onSubmit={handleSearchSubmit} className="form-inline" style={{marginTop:'10px'}}>
                <input 
                    type="text"
                    onChange={handleSearchInput}
                    className="form-control form-control-sm"
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{marginRight:'5px', marginLeft:'5px'}}>
                    Search</button>
                <button onClick={handleSearchReset} className="btn btn-primary btn-sm">
                    Reset</button>
            </form>
        </div>
    )
}

export default Search;