import Navbar from '../Navbar'

class OrgNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
     
    render(){
      return  super.render();
    }
}

OrgNavbar.defaultProps = {
  title: 'Product'
}
module.exports = OrgNavbar