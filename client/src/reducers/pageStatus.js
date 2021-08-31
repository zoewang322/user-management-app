const initialState = {
    currentId: '0' ,
    currentPage: '1'
}
export default (pageStatus = initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USERID':
            const newCurrentUser= pageStatus;
            newCurrentUser.currentId = action.payload;
            return newCurrentUser;

        case 'SET_PAPE_COUNT':
            const newPageCount = pageStatus;
            newPageCount.pageCount = action.payload
            return newPageCount;

        default:
            return pageStatus;
    }
}