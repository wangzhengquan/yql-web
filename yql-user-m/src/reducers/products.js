import {
  
  REQUEST_PRODUCTS, RECEIVE_PRODUCTS
} from '../actions/products'

 

export function products(state = {
  isFetching: false,
  items: []
}, action) {

  switch (action.type) {
     
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PRODUCTS:
      var {params,  isFetching} = action
      var items = [...state.items, ...action.items]
      let isLastPage = false
      if(params.limit) {
        if(!isFetching && action.items.length < params.limit) {
          isLastPage = true
        }
      } else {
        isLastPage = true
      }
      
      return Object.assign({}, state, {
        isFetching: false,
        isLastPage,
        items: items,
        lastUpdated: action.receivedAt
      })
     
    default:
      return state
  }
}



export function productsByPage(state = { }, action) {
  // debugger
  switch (action.type) {
    case RECEIVE_PRODUCTS:
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        [action.page]: products(state[action.page], action)
      })
    default:
      return state
  }
}

 

 
