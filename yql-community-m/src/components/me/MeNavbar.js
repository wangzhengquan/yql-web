import Navbar from '../Navbar'
class MeNavbar extends Navbar{
  

    constructor(props) {
      super(props);
      //this.props.title = 'Setting'
    }

     

    render(){
      return  super.render()
    }
}
MeNavbar.defaultProps = {
  title: '基本信息设置'
}
module.exports = MeNavbar