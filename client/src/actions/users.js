import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// ------- User CRUD Actions -------
// get all users 
const requestStart = () => {
  return {
    type: 'REQUEST_USERS_START'
  };
}
const requestSuccess = (users) => {
  return {
    type: 'REQUEST_USERS_SUCCESS',
    payload: users
  };
}
const requestFail = (error) => {
  return {
    type: 'REQUEST_USERS_FAIL',
    error
  };
}
const getError = (error) => {
  return {
    type: 'GET_ERROR',
    error
  }
}
export const getUsers = () => {
  return (dispatch, getState) => {
    // console.log('Start fetching...')
    dispatch(requestStart());
    axios
      .get(API_URL)
      .then(response => {
        dispatch(requestSuccess(response.data));
        dispatch(getPaginatedUsers());
      })
      .catch(err => {
        dispatch(requestFail(err.message));
      });
  };
}

// add user 
export function createUser(newUser, history) {
  return (dispatch, getState) => {
    axios.post(API_URL, newUser)
      .then((res) => {
        console.log(res);
        dispatch({ type: 'CREATE', payload: newUser });
        dispatch(checkAddedPage());
         }).then(() => history.push('/'))
      .catch(err => {
        dispatch(getError(err.message))
      })
  }
}

// edit user 
export function updateUser(id, updatedUser, history) {
  return (dispatch, getState) => {
    axios.patch(`${API_URL}/${id}`, updatedUser)
      .then(() => { 
        dispatch({ type: 'UPDATE', payload: updatedUser });
        history.push('/') })
      .catch(err => { 
        dispatch(getError(err.message)) 
      })
  }
} 
export function setCurrentId(currentId) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_CURRENT_USERID', payload: currentId })
  }
}

// delete user
export function deleteUser(id) {
  return (dispatch, getState) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE', payload: id });
        dispatch(getPaginatedUsers());
        dispatch(checkBlankPage());
      })
      .catch(err => {
        dispatch(getError(err.message))
      })
  }
}


// ------ Sort Actions ------
export function sortByAlphabet(order) {
  return (dispatch, getState) => {
    if (order === 'asc') {
      dispatch({ type: 'SORT_BY_ALPHABET_ASC' });
      dispatch(getPaginatedUsers());
    } else if (order === 'des') {
      dispatch({ type: 'SORT_BY_ALPHABET_DES' }); 
      dispatch(getPaginatedUsers());
    } 
  }
}


// ------ Search Actions ------
export function searchUsers(keyword) {
  return (dispatch, getState) => {
    dispatch({ type: 'SEARCH', payload: keyword })
    dispatch(getPaginatedUsers());
  }
}


// ------ Pagination Actions ------
export const getPaginatedUsers = () => {
  console.log('Getting new paginated user list... ')
  return (dispatch) => {
    dispatch({ type: 'GET_PAGINATED_USERS' });
    dispatch({ type: 'SET_PAGE_COUNT' });
  }
}

export function setCurrentPage(currentPage) {
  console.log(`Action received: setting current page as ${currentPage}`)
  return (dispatch, getState) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage })
    dispatch({ type: 'GET_PAGINATED_USERS' });
  }
}

export const setPrevPage = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_PREV_PAGE' })
    dispatch({ type: 'GET_PAGINATED_USERS' });
  }
}

export const setNextPage = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_NEXT_PAGE' })
    dispatch({ type: 'GET_PAGINATED_USERS' });
  }
}

export const checkBlankPage = () => {
  return (dispatch, getState) => {
    if (getState().users.paginatedUsers.length === 0) {
      dispatch(setPrevPage());
    }
  }
}

export const checkAddedPage = () => {
  return (dispatch, getState) => {
    if (getState().users.paginatedUsers.length === getState().users.usersPerPage) {
      dispatch(setNextPage());
    }
  }
}




