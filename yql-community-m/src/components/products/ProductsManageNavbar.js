import React  from 'react'
import { Link } from 'react-router'
import Navbar from '../Navbar'
import Tabs from 'react-ui/tabs'
import history from 'react-ui/history'
class ProductsManageNavbar extends Navbar{
    constructor(props) {
      super(props);
    }

    componentWillUnmount(){
      this.tabs.destroy()
    }
    
    componentDidMount(){
      super.componentDidMount()
      this.tabs = new Tabs({tabbar: this.refs.tabbar})
      this.tabs.on('show', (tab, tablink) => {
        console.log('tab', tab)
      })
    }

     
     
    render(){
      if(this.canBack === undefined){
        this.canBack = history.canBack;
      }
      return  (
      <div className="navbar-inner">
        {
        this.canBack ?
        <div className="left sliding" >
          <a onClick={this.handleBackClick.bind(this)} className="back link"><i className="icon icon-back" ></i><span>返回</span></a>
        </div> : ''
        }
        <div className="center sliding">
          <div className="buttons-row" ref="tabbar">
            <a href="#tab-active" className="button tab-link active">进行中</a>
            <a href="#tab-end" className="button tab-link">已结束</a>
          </div>
        </div>
        <div className="right">
          <Link to="/pub-product" className="link" alt="发布活动"><i style={{fontSize: '25px'}} className="iconfont icon-add"></i></Link>
        </div>
        
        
      </div>
      )
    }
}


module.exports = ProductsManageNavbar