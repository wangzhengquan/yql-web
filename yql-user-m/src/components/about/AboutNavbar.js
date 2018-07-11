import React  from 'react'
import ReactDOM from 'react-dom';
import Navbar from 'react-ui/navbar'
import $ from 'react-ui/dom'

class AboutNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

AboutNavBar.defaultProps = {
  title: 'About'
}
module.exports = AboutNavBar