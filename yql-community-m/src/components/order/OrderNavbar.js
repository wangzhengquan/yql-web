import Navbar from '../Navbar'

class OrderNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

OrderNavbar.defaultProps = {
  title: '报名详情'
}

module.exports = OrderNavbar