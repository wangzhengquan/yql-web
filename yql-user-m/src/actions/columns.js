import Ajax from '../ajax'

export const REQUEST_COLUMNS = 'REQUEST_COLUMNS'
export const RECEIVE_COLUMNS = 'RECEIVE_COLUMNS'

function requestColumns(page, params) {
  return {
    type: REQUEST_COLUMNS,
    page, 
    params
  }
}

function receiveColumns(page, params, data) {
  return {
    type: RECEIVE_COLUMNS,
    page,
    params,
    columns: data,
    receivedAt: Date.now()
  }
}

function fetchColumns(page, params) {
  return dispatch => {
    dispatch(requestColumns(page, params))
    return Ajax.ajax({
     url: 'columns',
     data: {
      page,
      ...params
     }
      
    }).then(([response]) => {
      console.log('response===', response)
      if(!response.error){
        dispatch(receiveColumns(page, params, response.data))
      }
    })
     
  }
}

function shouldFetchColumns(state, page) {
  const columns = state.columnsByPage[page]
  if (!columns) {
    return true
  }
  if (columns.isLastPage || columns.isFetching) {
    return false
  }
  return true
}

export function fetchColumnsIfNeeded(page, params) {
  return (dispatch, getState) => {
    if (shouldFetchColumns(getState(), page)) {
      return dispatch(fetchColumns(page, params))
    }
  }
}
