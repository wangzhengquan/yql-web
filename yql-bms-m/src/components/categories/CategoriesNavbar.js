import Navbar from '../Navbar'
import React from 'react'
class CategoriesNavbar extends Navbar{

    constructor(props) {
      super(props);
    }
     
    render(){
      	if(this.canBack === undefined){
	      this.canBack = history.canBack;
	    }
	    
	    return (
	       <div className="navbar-inner" data-page={this.props.pageName}>
	          {
	          this.canBack ?
	          <div className="left sliding" ><a onClick={this.handleBackClick.bind(this)} className="back link"><i className="icon icon-back" ></i><span>返回</span></a></div> : ''
	          }
	            
	          <div className="center sliding">{this.state.title || ''}</div>
	          <div className="right sliding"><a className="link ok add-new-cat">新增</a></div>
	        </div>
	    )
    }
}

CategoriesNavbar.defaultProps = {
  title: '类别管理'
}

module.exports = CategoriesNavbar