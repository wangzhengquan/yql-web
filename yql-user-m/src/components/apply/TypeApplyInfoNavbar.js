import Navbar from '../Navbar'

class TypeApplyInfoNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render();
    }
}

TypeApplyInfoNavbar.defaultProps = {
  title: '输入报名信息'
}

module.exports = TypeApplyInfoNavbar