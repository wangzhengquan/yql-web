import React  from 'react';
// require('../../resources/less/product-list.less')
import {Select, Option} from 'react-ui/forms'
import {List, ItemDivider} from 'react-ui/lists'
import Navbar from 'react-ui/navbar'

class CitySelectNavbar extends Navbar{
  

    constructor(props) {
      super(props);
    }
     
    render(){
      return  (
        <div className="navbar-inner navbar-on-center">
          <div className="left sliding" >
            <a href="#" onClick={this.props.onClose} className="icon-only link"><i className="icon icon-close"></i></a>
           </div>
           <div className="center sliding">选择城市</div>
        </div>
      )
    }
}

 
 

class CitySelectView extends React.Component{
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
  }


  render(){
    return (
        <div className="view">
          <div className="navbar">
            <CitySelectNavbar onClose={this.props.onClose}/>
          </div>
          <div className="pages navbar-through">
            <div className="page">
              <div className="page-content">
              <List style={{marginTop: 0, marginBottom: 0}}>
                <ItemDivider>GPS定位城市</ItemDivider>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">北京</div>
                  </div>
                </div>
              </List>

             
              <Select name="fruits" onSelect={this.props.onSelect} style={{marginTop: 0, marginBottom: 0}}>
                <Option type="label">已开通服务城市</Option>
                <Option value="apple" selected="selected">北京</Option>
                <Option value="pineapple">上海</Option>
                <Option value="pear">深圳</Option>
                <Option value="orange">杭州</Option>
                <Option value="melon">成都</Option>
                <Option value="peach">广州</Option>
                <Option value="banana">武汉</Option>
              </Select>
              </div>
            </div>
          </div>
         
        </div>
    );
  }
  
}


module.exports = CitySelectView