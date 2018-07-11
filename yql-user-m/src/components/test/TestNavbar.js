import React  from 'react'
import Navbar from 'react-ui/navbar'

class ModalsNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

ModalsNavBar.defaultProps = {
  title: 'Test'
}
module.exports = ModalsNavBar