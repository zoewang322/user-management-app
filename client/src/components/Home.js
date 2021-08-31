import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import UserList from './UserList';
import Search from './Search';

import { getUsers } from '../actions/users';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers());
  });


  return (
    <div className="container">
      <h3 style={{textAlign: "center", marginTop:"5vh", marginBottom:"5vh"}}>User List Management App</h3>
      <div>
        <Search />
      </div>
      <div>
        <UserList />
      </div>

      <div className="container" style={{marginBottom:"10vh", marginTop:"3vh"}}>
        <button onClick={() => history.push('/create')} className="btn btn-primary btn-sm" >
          Create New User</button>
      </div>
    </div>
  );

};

export default Home;

