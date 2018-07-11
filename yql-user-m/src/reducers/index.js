import { combineReducers } from 'redux'

import {SELECT_POSITION } from '../actions'

import {columnsByPage} from './columns'
import {productsByPage} from './products'

function selectedPosition (state = {city: {code: 0, name: '全国'}}, action) {
  switch (action.type) {
    case SELECT_POSITION:
      return action.position
    default:
      return state
  }
}

const rootReducer = combineReducers({
  columnsByPage,
  productsByPage,
  selectedPosition 
})

export default rootReducer
