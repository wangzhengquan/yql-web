import React  from 'react';
import ReactDOM from 'react-dom';
import $ from 'react-ui/dom'
import Navbar from 'react-ui/navbar'
class SettingNavbar extends Navbar{
  

    constructor(props) {
      super(props);
      //this.props.title = 'Setting'
    }

     

    render(){
      return  super.render()
    }
}
SettingNavbar.defaultProps = {
  title: '我的'
}
module.exports = SettingNavbar