import Navbar from '../Navbar'

class GroupsNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

GroupsNavbar.defaultProps = {
  title: '社团'
}
 

module.exports = GroupsNavbar