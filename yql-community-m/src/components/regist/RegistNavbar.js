import Navbar from 'react-ui/navbar'

class RegistNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

RegistNavbar.defaultProps = {
  title: '注册~'
}
 

module.exports = RegistNavbar