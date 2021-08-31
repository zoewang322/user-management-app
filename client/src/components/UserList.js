import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteUser, sortByAlphabet, getUsers } from '../actions/users';

import { Button } from '@material-ui/core/';
import { Delete, Edit, Sort } from '@material-ui/icons';
import { setCurrentId } from '../actions/users';

import Pagination from './Pagination';

const Userlist = () => {
  const [order, setOrder] = useState('normal');
  const dispatch = useDispatch();
  const history = useHistory()

  const users = useSelector((state) => state.users.paginatedUsers);

  const handleEdit = (id) => {
    dispatch(setCurrentId(id));
    history.push('/edit');
  }

  const handleSort = () => {
    if (order === 'normal') {
      setOrder('asc');
      dispatch(sortByAlphabet('asc'));
    } else if (order === 'asc') {
      setOrder('des');
      dispatch(sortByAlphabet('des'));
    } else if (order === 'des') {
      setOrder('normal');
      dispatch(getUsers());
      console.log('user order reset...')
    }
  }

  return (
      <div className="container" >

        <table className="table table-hover">
          <thead className="thead-light">
              <tr>
                  <th scope="col">First Name
                    <Button onClick={handleSort}><Sort /></Button>
                  </th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Sex</th>
                  <th scope="col">Age</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
              </tr>
          </thead>
          <tbody>
            {}
            {users.map((user) => (
              <tr key={user._id} style={{listStyle: "none"}}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.sex}</td>
                <td>{user.age}</td>
                <td><Button onClick={() => handleEdit(user._id)}><Edit /></Button></td>
                <td><Button onClick={() => dispatch(deleteUser(user._id))}><Delete /></Button></td>
              </tr>  
            ))}
          </tbody>
        </table>

        <div>
          <Pagination />
        </div>

      </div>
  )
};

export default Userlist;
