import Navbar from '../Navbar'

class OrderNavbar extends Navbar{

    constructor(props) {
      super(props);
      this.state = {
      	title: this.props.location.pathname==='order-confirm'? '报名确认': '报名详情'
      }
    }
     
    render(){
      return  super.render();
    }
}

OrderNavbar.defaultProps = {
  title: '报名详情'
}

module.exports = OrderNavbar