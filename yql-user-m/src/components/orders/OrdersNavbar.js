import Navbar from 'react-ui/navbar'
class SettingNavbar extends Navbar{
  

    constructor(props) {
      super(props);
      //this.props.title = 'Setting'
    }

     

    render(){
      return  super.render()
    }
}
SettingNavbar.defaultProps = {
  title: '我参与的活动'
}
module.exports = SettingNavbar