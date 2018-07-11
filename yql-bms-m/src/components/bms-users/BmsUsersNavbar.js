import React from 'react'
import Navbar from '../Navbar'

class BmsUsersNavbar extends Navbar{

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
	          <div className="right"><a className="link add-new">新增</a></div>
	        </div>
	    )
	  
    }
}

BmsUsersNavbar.defaultProps = {
  title: '系统用户管理'
}

module.exports = BmsUsersNavbar