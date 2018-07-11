import Navbar from 'react-ui/navbar'
import CompatibleMap from './CompatibleMap'

class RegistNavbar extends Navbar{
  

    constructor(props) {
      super(props);
      this.state = {
      	title:  CompatibleMap[props.location.pathname].title
      }
    }
     
    render(){
      return  super.render();
    }
}

 
 

module.exports = RegistNavbar