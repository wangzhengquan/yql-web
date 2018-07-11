import React  from 'react';
import { Link, IndexLink } from 'react-router'
import Navbar from 'react-ui/navbar'
import Page from 'react-ui/page'
let classNames = require('classnames');

class Tabbar extends React.Component{
  constructor(props) {
    super(props);
  }

  handleTabClick(){
    Page.anim = false
    Navbar.anim = false
    //window.alert('cick')
  }

  render(){
    return (
   	<div id="app-toolbar" className={classNames('toolbar tabbar tabbar-labels', {'toolbar-hidden': false})}>
	  <div className="toolbar-inner tabbar tabbar-labels">
	    <IndexLink to="/" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon icon-home"></i>
	      <span className="tabbar-label">首页</span>
	    </IndexLink>

	    <Link to="/communities" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon icon-community"></i>
	      <span className="tabbar-label">社团</span>
	    </Link>

	    <Link to="/my" className="tab-link" activeClassName="active" onClick={this.handleTabClick.bind(this)}>
	      <i className="icon icon-me">
	        {/*<span className="badge theme-red">4</span>*/}
	      </i>
	      <span className="tabbar-label">我的</span>
	    </Link>
	  </div>
	</div>
    );
  }
}

module.exports = Tabbar
 