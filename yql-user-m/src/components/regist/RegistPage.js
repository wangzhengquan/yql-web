
import React  from 'react';
import Page from 'react-ui/page'
import {Link} from 'react-router'
import classNames from 'classnames'
import Ajax from '../../ajax'
import List from 'react-ui/lists'
import RegExpUtil from 'react-ui/regexp'
import VerificationCodeView from './VerificationCodeView'
import CompatibleMap from './CompatibleMap'
require('react-ui/resources/less/forms.less')
require('../../resources/less/regist-page.less')
// require('react-ui/resources/less/lists.less');
// require('react-ui/resources/less/forms.less');

// CompatibleMap

class RegistPage extends Page{
  constructor(props) {
    super(props);
    this.state = {value: ''}
    this.params = CompatibleMap[props.location.pathname]
  }


  handleNextStep(e){
    e.preventDefault()
    var me = this;
    var  mobile =  this.state.value
    Ajax.ajax({
      method: 'GET',
      url: 'sms-code/get',
      data: {
        mobile: mobile,
        action: this.params.action
      }
    }).then(([json]) => {
      if(json.error) {
        return;
      }
      VerificationCodeView.open({
        mobile: mobile,
        params: me.params
      })
       
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
                  <input type="tel" value={this.state.value || ''} onChange={this.handleChangeMobile.bind(this)} placeholder="请输入手机号" ref="mobile"/>
                </div>
              </div>
            </div>
          </List>
          <div style={{ padding: '0 15px'}}>
            <button className="button button-fill"  disabled={!this.state.validate} onClick={this.handleNextStep.bind(this)}>下一步</button>
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
    var value = e.target.value.trim();
    this.setState({
      value: value,
      validate: RegExpUtil.patterns.mobile.test(value)
    })
  }
 
  
}

module.exports = RegistPage

