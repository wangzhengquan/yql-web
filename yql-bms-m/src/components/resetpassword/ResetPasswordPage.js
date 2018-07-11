import React  from 'react';
import {Link} from 'react-router'
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import Ajax from '../../ajax'
import JSEncrypt from  'react-ui/encrypt-rsa.js'
import pubkey from '../../resources/certificate/server_rsa_512_pub.js'
require('react-ui/resources/less/forms.less')


class ResetpassPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  onOk(e){
    e.preventDefault()
    var password = this.refs.password.value
    var encrypt = new JSEncrypt({
        default_key_size: 512
      });
    encrypt.setPublicKey(pubkey);
    password = encrypt.encrypt(password)
    Ajax.ajax({
      url: '/bms-user/resetpassword',
      method: 'PUT',
      data: {
        password: password
      },
      success: (json) => {
        window.sessionStorage.removeItem('token')
        if(!json.error) location.href='/login'
      }
    })
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
        <List>
	        <div className="item-content">
            <div className="item-inner">
              <div className="item-title label">新密码</div>
              <div className="item-input">
                <input type="text" placeholder="新密码" ref="password" />
              </div>
            </div>
          </div>
        </List>

        <div style={{marginTop: '15px', padding: '0 20px'}}>
          <a className="button button-fill" onClick={this.onOk.bind(this)} style={{height: '40px', lineHeight: '40px'}}>确定</a>
        </div>
	    </div>
	  </div>
  	)
  }
}

module.exports = ResetpassPage
