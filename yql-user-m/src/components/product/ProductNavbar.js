import Navbar from '../Navbar'

class ProductNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  super.render()

    }
}

ProductNavbar.defaultProps = {
  title: '活动详情'
}

module.exports = ProductNavbar