import Navbar from '../Navbar'


class ProductNavbar extends Navbar{
  

    constructor(props) {
      super(props);
      this.state = {
      	title : this.props.params.id ? props.location.pathname.startsWith('recover-product')? '恢复活动': '修改活动信息': '发布活动'
      }
    }
     
    render(){
      return  super.render()

    }
}

ProductNavbar.defaultProps = {
  title:  '发布活动'
}

module.exports = ProductNavbar