import Navbar from 'react-ui/navbar'

class LoginNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

LoginNavbar.defaultProps = {
  title: '登录'
}
 

module.exports = LoginNavbar