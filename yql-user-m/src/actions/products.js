import Ajax from '../ajax'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
function request(page,params) {
  return {
    type: REQUEST_PRODUCTS,
    page,
    params
  }
}

function receive(page, params, data) {
  return {
    type: RECEIVE_PRODUCTS,
    page,
    params,
    items: data,
    receivedAt: Date.now()
  }
}

 

function fetch(page, params) {
  return dispatch => {
    dispatch(request(page, params))
    return Ajax.ajax({
     url: '/products',
     data: params
      
    }).then(([response]) => {
      console.log('response===', response)
      if(!response.error){

        dispatch(receive(page, params, response.data))
      }
    })
     
  }
}

 

function shouldFetch(state, page) {
  console.log('shouldFetch', state)
  const products = state.productsByPage[page]
  if(!products) 
    return true
   
  if (products.isFetching || products.isLastPage) {
    return false
  }
  return true
}

export function fetchProductsIfNeeded(page, params) {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), page)) {
      return dispatch(fetch(page, params))
    }
  }
}

 
