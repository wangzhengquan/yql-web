import Navbar from '../Navbar'

class ResetpasswordNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

ResetpasswordNavbar.defaultProps = {
  title: '重置密码'
}

module.exports = ResetpasswordNavbar