import React  from 'react';
import AnimPage from '../Page'
import classNames from 'classnames';
import {Link} from 'react-router'

require('../../resources/less/home-page.less')
require('react-ui/resources/less/grid.less')
 

class HomePage extends AnimPage{
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render(){
    

    return (
      <div className={classNames('page', this.props.className)} >
        <div className="page-content">
          <div className="menu-panel menu-panel-labels"  style={{padding: '15px'}}>
            <ul className="row">
              <li className="col-33">
                <Link to="/decorate-home" className="menu-link" activeClassName="active">
                  <i className="icon icon-product-manage"></i>
                  <span className="menu-label">装修首页</span>
                </Link>
              </li>
              <li className="col-33">
                <Link to="/categories" className="menu-link" activeClassName="active">
                  <i className="icon icon-publish-product"></i>
                  <span className="menu-label">类别管理</span>
                </Link>
              </li>
              <li className="col-33">
                <Link to="/decorate" className="menu-link" activeClassName="active">
                  <i className="icon icon-decorate-community"></i>
                  <span className="menu-label">社团管理</span>
                </Link>
              </li>
            </ul>

            <ul className="row">
                
               <li className="col-33">
                <Link to="/me" className="menu-link" activeClassName="active">
                  <i className="icon icon-product-manage"></i>
                  <span className="menu-label">用户管理</span>
                </Link>
              </li>
              <li className="col-33">
                <Link to="/bms-users" className="menu-link" activeClassName="active">
                  <i className="icon icon-product-manage"></i>
                  <span className="menu-label">系统用户管理</span>
                </Link>
              </li>
              <li className="col-33">
                <Link to="/resetpassword" className="menu-link" activeClassName="active">
                  <i className="icon icon-product-manage"></i>
                  <span className="menu-label">修改密码</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    );
  }
  
}

module.exports = HomePage
