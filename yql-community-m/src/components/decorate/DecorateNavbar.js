import Navbar from '../Navbar'

class DecorateNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

DecorateNavbar.defaultProps = {
  title: '社团装修'
}
 

module.exports = DecorateNavbar