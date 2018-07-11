import React  from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import Modals from 'react-ui/modals'
import AddBmsUserView from './AddBmsUserView'
import Ajax from '../../ajax'

class BmsUsersPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {

    }
    this.init()

  }
   
  init(){

    Ajax.ajax({
      url: '/bms-users',
      method: 'GET',
      success: (json) => {
        var data = json.data || this.state.data
        this.setState({
          data: data
        })
      }
    })
  }
  componentDidMount(){
    super.componentDidMount()
    var handleClickAddNewBtn = this.handleClickAddNewBtn.bind(this)
    $(document).on('click', '.navbar-inner[data-page='+this.props.pageName+'] .add-new', handleClickAddNewBtn)
    this.destroyList.push(() => {$(document).off('click', '.navbar-inner[data-page='+this.props.pageName+'] .add-new', handleClickAddNewBtn)})
  }

  handleClickAddNewBtn(event) {
    event.preventDefault()
     

    var modal = Modals.popup()
    var onOk = (user) => {
      Modals.closeModal(modal)
      var data = this.state.data
      data.push(user)
      this.setState({
        data: data
      })
    }

    var onCancel = () => {
      Modals.closeModal(modal)
    }
    ReactDOM.render(<AddBmsUserView onOk={onOk} onCancel={onCancel}/>, modal)
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	       <List>
         {
          this.state.data ? this.state.data.map( item => (
            <a href="#" className="item-link item-content" key={item.id}>
              <div className="item-inner"> 
                <div className="item-title">{item.username}</div>
              </div>
            </a>
          )) : ''
         }
          
         </List>
	    </div>
	  </div>
  	)
  }
}

module.exports = BmsUsersPage
