const initState = { 
    isLoading: false, 
    error: '', 

    data: [],   
    order: '', 

    paginatedUsers: [], 
    currentPage: 1,
    usersPerPage: 5,
    pageCount: 0
};

export default (state = initState, action) => {
  switch (action.type) {

    // ------ User CRUD -------
    case 'REQUEST_USERS_START':
      return {
        ...state,
        isLoading: true
      };

    case 'REQUEST_USERS_SUCCESS':
      console.log('Loading successed... ');
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case 'REQUEST_USERS_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    
    case 'CREATE':
      return {
        ...state,
        data: [[...state.data], action.payload]
      };

    case 'UPDATE':
      const newUserData = state.data.map((user) => (user._id === action.payload._id ? action.payload : user))
      return {
        ...state,
        data: newUserData
      };
    
    case 'DELETE':
      console.log('User deleted.')
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload)
      };
    
    // ------ Sort ------
    case 'SORT_BY_ALPHABET_ASC':
      let usersASC = state.data.sort((a, b) => a.first_name.localeCompare(b.first_name));  
      console.log('User sorted ascending... ')  
      return {
        ...state,
        data: usersASC
      };
  
    case 'SORT_BY_ALPHABET_DES':
      let usersDES = state.data.sort((a, b) => -a.first_name.localeCompare(b.first_name));  
      console.log('User sorted descending... ')
      return {
        ...state,
        data: usersDES
      };
    
    // ------ Search ------
    case 'SEARCH':
      let pattern = action.payload.toLowerCase();
      let unsearchedUsers = state.data;
      let searchedResult = [];
      for (let i = 0; i < unsearchedUsers.length; i++) {
        if (  unsearchedUsers[i].first_name.toLowerCase().search(pattern) !== -1 ||
              unsearchedUsers[i].last_name.toLowerCase().search(pattern) !== -1 ||
              unsearchedUsers[i].sex.toLowerCase().search(pattern) !== -1 ||
              unsearchedUsers[i].age.toLowerCase().search(pattern) !== -1 
        ) { searchedResult.push(unsearchedUsers[i]); }
      }
      return {
        ...state,
        data: searchedResult
      }
    
    // ------ Pagination ------
    case 'GET_PAGINATED_USERS':
      let currentPageUsers = [];
      let offset = (state.currentPage-1) * state.usersPerPage;
      currentPageUsers = state.data.slice(offset, offset+state.usersPerPage);
      // console.log(`Displaying users from ${offset} to ${offset+state.usersPerPage}`)
      return {
        ...state,
        paginatedUsers: currentPageUsers
      }
    
    case 'SET_PAGE_COUNT':
      return {
        ...state,
        pageCount: Math.ceil(state.data.length/state.usersPerPage)
      }
    
    case 'SET_CURRENT_PAGE':
      // console.log(`prev page is ${state.currentPage}`)
      // console.log(`new page set as ${action.payload}`)
      return {
        ...state,
        currentPage: action.payload
      }
    
    case 'SET_PREV_PAGE':
      return {
        ...state,
        currentPage: state.currentPage > 1 ? state.currentPage - 1 : state.currentPage
      }
    
    case 'SET_NEXT_PAGE':
      return {
        ...state, 
        currentPage: state.currentPage === state.pageCount ? state.currentPage : state.currentPage + 1
      }

    default:
      return state;
  }
};

