import Navbar from '../Navbar'

class ActNavBar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

ActNavBar.defaultProps = {
  title: 'Product'
}
module.exports = ActNavBar