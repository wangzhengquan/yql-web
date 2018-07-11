import Navbar from '../Navbar'

class OrdersNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

OrdersNavbar.defaultProps = {
  title: '报名用户'
}

module.exports = OrdersNavbar