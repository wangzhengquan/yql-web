import Navbar from 'react-ui/navbar'

class QuickLoginNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

QuickLoginNavbar.defaultProps = {
  title: '快捷登录'
}
 

module.exports = QuickLoginNavbar