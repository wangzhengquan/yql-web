import React  from 'react';
import $ from 'react-ui/dom'
import Ajax from '../../ajax'
import AnimationPage from '../Page'
import classnames from 'classnames';
import SwipeOut from 'react-ui/swipeout'
import TextfieldEditorView from 'react-ui/widget/textfield-editor'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

require('react-ui/resources/less/lists.less')
require('../../resources/less/animation-items.less')


class CategoriesPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    }
    this.init()
  }

  init(){
    Ajax.ajax({
      url: '/categories',
      method: 'GET',
      success: (json) => {
        var data = this.state.data;
        data = json.data;
        this.setState({
          data: data
        })
      }
    })
  }

  componentDidMount(){
    super.componentDidMount()
    SwipeOut.initSwipeout()
    var onAdd = this.handleClickAdd.bind(this)
    $(document).on('click', '.navbar-inner[data-page='+this.props.pageName+'] .ok', onAdd)
    this.destroyList.push(()=> {$(document).off('click', '.navbar-inner[data-page='+this.props.pageName+'] .ok', onAdd)})
  }

  handleClickAdd(e){
    e.preventDefault()
    TextfieldEditorView.open({
      onOk: (value) => {
        Ajax.ajax({
          url: '/category/create',
          method: 'POST',
          contentType: 'applicaton/json',
          data: JSON.stringify({
            name: value,
            sort: this.state.data.length

          }),
          success: (json) => {
             var data = this.state.data;
             data.push(json.data)
             this.setState({
              data: data
             })
          }
        })
      }
    })
  }

  handleClickUpdateBtn(index, e){
    e.preventDefault()

    var updateItem = this.state.data[index]
    TextfieldEditorView.open({
      value: updateItem.name,
      onOk: (value) => {
        updateItem.name = value
        Ajax.ajax({
          url: '/category/update',
          method: 'PUT',
          contentType: 'applicaton/json',
          data: JSON.stringify(updateItem),
          success: (json) => {
            if(json.error) return
            var data = this.state.data;
            this.setState({
              data: data
            })
          }
        })
      }
    })
   
  }
   
  

  handleClickDeleteBtn(index, e){
    e.preventDefault()
    var data = this.state.data;
    var delItem = data[index]
    Ajax.ajax({
      url: '/category/'+delItem.id+'/delete',
      method:'DELETE',
      success: (json) => {
        if(json.error) return
        data.splice(index, 1)
        this.setState({
          data: data
        })
      }
    })
  }



  moveUp(index, e){
    e.preventDefault()
    e.stopPropagation();
    var data = this.state.data;
    var tmp = data[index]
    data[index] = data[index-1]
    data[index-1] = tmp

    if(this.xhr) this.xhr.abort();

    this.xhr = Ajax.ajax({
      url: '/categories/sort',
      method: 'PUT',
      contentType: 'applicaton/json',
      data: JSON.stringify(this.state.data),
      success: (json) => {
        if(json.error) return

        this.setState({
          data: data
        })
      }
    })
    return false;
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
      {
        this.state.data ? 
	      <div className="list-block">
          <ReactCSSTransitionGroup component="ul" transitionName="item" transitionAppear={false} transitionAppearTimeout={0} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {
             this.state.data.map( (item, index) => (
                <li className="swipeout" key={item.id}>
                  <div onClick={this.handleClickUpdateBtn.bind(this, index)} className="item-content item-link swipeout-content">
                    <div className="item-inner">
                      <div className="itema-title">{item.name}</div>
                      <div className="item-ater">
                        {index ===0 ? '' : <a onClick={this.moveUp.bind(this, index)}>上移</a>}
                      </div>
                    </div>
                  </div>
                  <div className="swipeout-actions-right"><a href="#" onClick={this.handleClickDeleteBtn.bind(this, index)}  className="swipeout-delete">Delete</a></div>
                </li>

              ))
          }
            
          </ReactCSSTransitionGroup>
        </div> : ''
      }
	    </div>
	  </div>
  	)
  }
}

module.exports = CategoriesPage
