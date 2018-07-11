// import React  from 'react';
import Navbar from 'react-ui/navbar'

class SetCommunityInfoNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

SetCommunityInfoNavbar.defaultProps = {
  title: '填写社团信息~'
}
 

module.exports = SetCommunityInfoNavbar