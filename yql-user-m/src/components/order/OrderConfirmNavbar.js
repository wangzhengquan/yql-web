import Navbar from '../Navbar'

class OrderConfirmNavbar extends Navbar{

    constructor(props) {
      super(props);
       
    }
     
    render(){
      return  super.render();
    }
}

OrderConfirmNavbar.defaultProps = {
  title: '报名确认'
}

module.exports = OrderConfirmNavbar