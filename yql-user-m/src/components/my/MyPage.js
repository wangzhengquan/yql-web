import React  from 'react';
import AnimationPage from 'react-ui/page'
import classNames from 'classnames';
import { Link } from 'react-router'
import Auth from '../../services/Auth'
import Config from '../../config'
import history from '../../history'
require('../../resources/less/my-page.less');
require('react-ui/resources/less/lists.less');
require('react-ui/resources/less/forms.less');
class SettingPage extends AnimationPage{
  
    constructor(props) {
      super(props);
      var user =  Auth.getUser()
       
      this.state = {
        user: user
      }
    }
    
    handleQuite(e){
      e.preventDefault()
      Auth.logout()
      history.push('/login')
    }

    render(){
      return (
        <div className={classNames('page my-page', this.props.className)}>
          <div className="page-content">
            <div className="list-block media-list" style={{marginTop:'10px'}}>
              <ul>
                <li>
                  <Link to="/me"  className="item-content item-link">
                    <div className="item-media"><img src={this.state.user.avatar || require('../../resources/svg/avatar.svg')} width="44"/></div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <div className="item-title">{this.state.user.realname ? this.state.user.realname : this.state.user.mobile}</div>
                      </div>
                      {this.state.user.realname ? <div className="item-subtitle">电话: {this.state.user.mobile}</div> : ''}
                     
                    </div>
                  </Link>
                </li>
              </ul>
              

              <ul style={{marginTop: '10px'}}>
                <li>
                  <Link to="/orders" className="item-link"  >
                    <div className="item-content">
                      <div className="item-media feedback spring"></div>
                      <div className="item-inner">
                        <div className="item-title">我参与的活动</div>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>

              <ul style={{marginTop: '10px'}} >
                <li>
                  <a href={Config.COMMUNITY_HOST+'?token='+encodeURIComponent(Auth.getToken())} className="item-content item-link">
                    <div className="item-media language">
                      <i className="icon ios7-world-outline"></i>
                    </div>
                    <div className="item-inner">
                      <div className="item-title">{Auth.getUser().community ? Auth.getUser().community.name : '创建社团'}</div>
                    </div>
                  </a>
                </li>
              </ul>

               <ul style={{marginTop: '10px'}}>
                <li>
                  <Link to="/modify-password" className="item-link"  >
                    <div className="item-content">
                      <div className="item-media feedback spring"></div>
                      <div className="item-inner">
                        <div className="item-title">修改密码</div>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>

              <ul style={{marginTop: '10px'}} >
                <li><a onClick={this.handleQuite.bind(this)} className="list-button item-link color-red">退出登录</a></li>
              </ul>
            </div>
          </div>
        </div>

      );
    }
}

module.exports = SettingPage