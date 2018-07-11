import React  from 'react';
import ReactDOM from 'react-dom';
import Modals from 'react-ui/modals'
import Panels from 'react-ui/panels'
import history from 'react-ui/history'
import Navbars from 'react-ui/navbars'
import $ from 'react-ui/dom'
import Navbar from '../Navbar'

var CitySelectView = require('../widget/CitySelectView')

class HomeNavbar extends Navbar{
    constructor(props) {
      super(props);
    }

    

    handleCityBtnClick(e){
      e.preventDefault()
      var citySelectModal = Modals.popup()
      var closeModal = (e) => {
        e.preventDefault()
        Modals.closeModal(citySelectModal)
      }
      var onOk= function(value){
        this.props.onOk && this.props.onOk(value);
        Modals.closeModal(citySelectModal)
      }
      ReactDOM.render(<CitySelectView onClose={closeModal} onOk={onOk.bind(this)}/>, citySelectModal)
    }

   handleClickAddNew(e){
     e.preventDefault()
     this.props.onClickAppendBtn && this.props.onClickAppendBtn()
   }
     
    render(){
      return (
      
      <div className="navbar-inner decorate-home-navbar-inner" data-page={this.props.dataPage}>
        <div className="left">
            <a href="#" onClick={this.handleCityBtnClick.bind(this)} className="city-select-link link"> <span>北京</span><i className="icon icon-arrow-down"></i></a>
        </div>

        <div className="center">首页装修</div>
        <div className="right">
            <a className="link button-append" > 新增</a>
        </div>
     </div>
     )

    }
}

 

module.exports = HomeNavbar