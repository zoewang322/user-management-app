import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser, updateUser } from '../actions/users';

const Form = ({ currentId }) => {
  const [userData, setUserData] = useState({ first_name: '', last_name: '', age: '', sex: '', password: '' });
  
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => (currentId ? state.users.data.find((user) => user._id === currentId) : null));
  
  useEffect(() => {
    if(user) setUserData(user); 
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
        dispatch(createUser(userData, history));
    } else {
      dispatch(updateUser(currentId, userData, history));
    }
  };

  return (
    <div className={"col-md-12 form-wrapper"}>
      <form onSubmit={handleSubmit}>
        <h3 style={{marginTop:"5vh", marginBottom:"5vh", textAlign:"center"}}>
          {currentId ? `Editing ${userData.first_name} ${userData.last_name}` : 'Creating New User'}</h3>
        <div className="form-group col-md-12">
          <label htmlFor="first_name">First Name </label>
          <input 
            type="text" 
            id="first_name" 
            defaultValue={userData.first_name} 
            onChange={(e) => setUserData({ ...userData, first_name: e.target.value })} 
            name="first_name" 
            className="form-control" 
            placeholder="Enter first name" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="last_name">Last Name </label>
          <input 
            type="text" 
            id="last_name" 
            defaultValue={userData.last_name} 
            onChange={(e) => setUserData({ ...userData, last_name: e.target.value })} 
            name="last_name" 
            className="form-control" 
            placeholder="Enter last name" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="sex">Sex</label>
          <input 
            type="text" 
            id="sex" defaultValue={userData.sex} 
            onChange={(e) => setUserData({ ...userData, sex: e.target.value })} 
            name="sex" 
            className="form-control" 
            placeholder="Enter sex" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="age">Age</label>
          <input 
            type="text" 
            id="age" defaultValue={userData.age} 
            onChange={(e) => setUserData({ ...userData, age: e.target.value })} 
            name="age" 
            className="form-control" 
            placeholder="Enter age" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="password">Password</label>
          <input 
            type="text" 
            id="password" defaultValue={userData.password} 
            onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
            name="password" 
            className="form-control" 
            placeholder="Enter password" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="repeat">Repeat</label>
          <input 
            type="text" 
            id="repeat" 
            onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
            name="repeat" 
            className="form-control" 
            placeholder="Repeat password" />
        </div>
        <div><button className="btn btn-primary" type="submit" >
          Save User</button></div>
      </form>
    </div>
  );
};

export default Form;
