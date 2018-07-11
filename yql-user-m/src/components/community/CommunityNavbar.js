import Navbar from '../Navbar'

class GroupNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

GroupNavbar.defaultProps = {
  title: '社团详情'
}
 

module.exports = GroupNavbar