import AppDispatcher from '../dispatcher/AppDispatcher'
import ActionTypes from '../constants/ActionTypes';
import MicroEvent from 'react-ui/microevent';
// import Ajax from '../../ajax'
var CHANGE_EVENT = 'change';

var _datas = [];
const limit = 6;
var loadFinished = false
 


var Store = {

  emitChange() {
    this.fireEvent(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    
    this.removeListener(CHANGE_EVENT, callback);
  },

  getLimit(){
    return limit
  },

  isLoadFinished(){
    return loadFinished
  },
  get(id) {
    return _datas[id];
  },

  getAll(data, cb) {
    return _datas
  }

};

MicroEvent.mixin(Store)

Store.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
 
    case ActionTypes.LOAD_PRODUCTS_FIRST:
      _datas = action.data;
      loadFinished = action.data.length<limit
      Store.emitChange();
      break;
    case ActionTypes.LOAD_MORE_PRODUCTS:
      _datas = _datas.concat(action.data);
      loadFinished = action.data.length<limit
      Store.emitChange();
      break;

    default:
      // do nothing
  }

});
export default Store;
