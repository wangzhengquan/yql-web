import {
  
  REQUEST_COLUMNS, RECEIVE_COLUMNS
} from '../actions/columns'

 

export function columns(state = {
  isFetching: false,
  columns: []
}, action) {

  switch (action.type) {
     
    case REQUEST_COLUMNS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_COLUMNS:
      var {params,  isFetching} = action
      var columns = [...state.columns, ...action.columns]
      let isLastPage = false
      if(params && params.limit) {
        if(!isFetching && action.columns.length < params.limit) {
          isLastPage = true
        }
      } else {
        isLastPage = true
      }
      return Object.assign({}, state, {
        isFetching: false,
        isLastPage,
        columns: columns,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}



export function columnsByPage(state = { }, action) {
  // debugger
  switch (action.type) {
    case RECEIVE_COLUMNS:
    case REQUEST_COLUMNS:
      return Object.assign({}, state, {
        [action.page]: columns(state[action.page], action)
      })
    default:
      return state
  }
}

 

 
