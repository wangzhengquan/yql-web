import React  from 'react';
import Page from '../Page'
import {Link} from 'react-router'
import classNames from 'classnames'
import Auth from '../../services/Auth'
import history from '../../history'
import pubkey from '../../resources/certificate/server_rsa_512_pub.js'
var JSEncrypt = require( 'react-ui/encrypt-rsa.js' );
require('../../resources/less/login-page.less')
// require('react-ui/resources/less/lists.less');
// require('react-ui/resources/less/forms.less');


class LoginPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: ''
      }
    }
  }
   
  login(e){
    e.preventDefault();
    var encrypt = new JSEncrypt({
      default_key_size: 512
    });
    encrypt.setPublicKey(pubkey);
    var username = this.refs.username.value;
    var password = encrypt.encrypt(this.refs.password.value);

    Auth.login({
      username: username,
      password: password
    }, ()=> {
      history.replace(window.sessionStorage.getItem('nextPath') || '/')
      window.sessionStorage.removeItem('nextPath')
    })
  }

  render(){
    return (
      <div className={classNames('page login-page', this.props.className)}>
        <div className="page-content" ref="pageContent">
          {
            /*
            <nav className="login-navbar">
            <div className="left title">
              <a className="link" href="">帐号登录</a>
            </div>
            
            <div className="right">
               <Link className="link" to="quick-login">
                <span>手机快捷登录</span><i className="icon icon-arrow-right"></i>
              </Link>
            </div>
          </nav>
             */
          }
          
          <form  autoComplete="off"  className="login-form">
            <ul>
              <li>
                <div className="item-input">
                  <input type="tel" placeholder="手机号" ref="username" maxLength="11"/>
                </div>
              </li>
              <li>
                <div className="item-input">
                  <input type="password" placeholder="密码" ref="password" />
                </div>
              </li>
            </ul>
            <button onClick={this.login.bind(this)} className="button button-fill">登录</button>
          </form>

          <nav className="login-navbar">
            <div className="left">
              <Link className="link" to="regist">注册帐号</Link>
            </div>
            <div className="right">
               <Link to="/retrieve-password" className="link">
                <span>忘记密码？</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    );
  }

  handleUsernameChange(e){
    var data = this.state.data;
    data.username = e.target.value;
    this.setState({
      data: data
    })
  }

  handlePasswordChange(e){
    var data = this.state.data;
    data.password = e.target.value;
    this.setState({
      data: data
    })
  }
  
}

module.exports = LoginPage
