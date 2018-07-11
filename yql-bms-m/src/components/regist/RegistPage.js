import React  from 'react';
import Page from 'react-ui/page'
import {Link} from 'react-router'
import classNames from 'classNames'
import Ajax from '../../ajax'
import List from 'react-ui/lists'
import history from 'react-ui/history'

import VerificationCodeView from './VerificationCodeView'
require('react-ui/resources/less/forms.less')
require('../../resources/less/regist-page.less')
// require('react-ui/resources/less/lists.less');
// require('react-ui/resources/less/forms.less');


class RegistPage extends Page{
  constructor(props) {
    super(props);
    
  }
   
  // handleRegist(e){
  //   e.preventDefault();

  //   var encrypt = new JSEncrypt({
  //     default_key_size: 512
  //   });
  //   encrypt.setPublicKey(pubkey);
  //   var data = this.state.data
  //   data.password = encrypt.encrypt(data.password)
     
  //   // console.log(this.context, this.context.router, this.props, this.props.location.push)
  //   Ajax.ajax({
  //     method: 'POST',
  //     contentType: 'applicaton/json',
  //     url: 'user/regist',
  //     data: JSON.stringify(data)
  //   }).then(function([json]){
  //     console.log('json', json)
  //     if(!json.error) {
  //       history.push('/login')
  //     }
  //   }, function(err){
  //     console.error('err', err)
  //   })
  // }


  handleNextStep(e){
    e.preventDefault()

    var me = this;
    var  mobile =  me.refs.mobile.value
    Ajax.ajax({
      method: 'GET',
      url: 'verification-code',
      data: {
        mobile: mobile
      }
    }).then(function([json]){
      console.log('json', json)
      if(json.error) {
        alert(json.message)
        return;
      }
      VerificationCodeView.open({
        mobile: mobile
      })
       
    }, function(err){
      alert(err.message);
      console.error('err', err)
    })
    
  }

  render(){
    return (
      <div  className={classNames('page regist-page', this.props.className)}>
        <div className="page-content">
          <List style={{margin: '15px 0'}}>
            <div className="item-content">
              <div className="item-inner"> 
                <div className="item-title label">手机号</div>
                <div className="item-input">
                  <input type="text" placeholder="请输入手机号" ref="mobile"/>
                </div>
              </div>
            </div>
          </List>
          <div style={{ padding: '0 15px'}}>
            <button className="button button-fill" onClick={this.handleNextStep.bind(this)}>下一步</button>
          </div>
          <section className="section-tip">
            <p>
              点击注册，即表示你已同意 <Link to="">《用户协议》</Link>
            </p>
          </section>
          
           
        </div>
      </div>
    );
  }

  handleChangeMobile(e){
    var data = this.state.data;
    data.mobile = e.target.value;
    this.setState({
      data: data
    })
  }

  handleChangePassword(e){
    var data = this.state.data;
    data.password = e.target.value;
    this.setState({
      data: data
    })
  }
  
}

module.exports = RegistPage
