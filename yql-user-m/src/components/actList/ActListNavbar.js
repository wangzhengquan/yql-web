import Navbar from '../Navbar'

class ActListNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

ActListNavbar.defaultProps = {
  title: 'Product'
}
module.exports = ActListNavbar