import Navbar from '../Navbar'
import Auth from '../../services/Auth'
class HomeNavbar extends Navbar{
    constructor(props) {
      super(props);
    }
     
    render(){
       return super.render()
    }
}

HomeNavbar.defaultProps = {
  title: '工作台-'
}

 

module.exports = HomeNavbar