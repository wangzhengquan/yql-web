import React  from 'react';
import Page from 'react-ui/page'
import {Link} from 'react-router'
import classNames from 'classnames'
import Auth from '../../services/Auth'
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
    })
  }

  render(){
    return (
      <div className={classNames('page login-page', this.props.className)}>
        <div className="page-content" ref="pageContent">
           
          <form  autoComplete="off"  className="login-form">
            <ul>
              <li>
                <div className="item-input">
                  <input type="text" placeholder="用户名" ref="username" maxLength="11"/>
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
