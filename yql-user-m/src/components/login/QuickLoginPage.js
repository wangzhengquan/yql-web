import React  from 'react';
import Page from '../Page'
import classNames from 'classnames'
require('../../resources/less/login-page.less')
// require('react-ui/resources/less/lists.less');
// require('react-ui/resources/less/forms.less');

class QuickLoginPage extends Page{
  constructor(props) {
    super(props);
  }
   

  render(){
    return (
      <div  className={classNames('page login-page', this.props.className)}>
        <div className="page-content" ref="pageContent">
           
          <form className="login-form">
            <ul>
              <li>
                <div className="item-input has-right-btn">
                  <input type="tel" placeholder="手机号" className="" maxLength="11"/>
                  <button className="btn-verify-code">获取验证码</button>
                </div>
              </li>
              <li>
                <div className="item-input">
                  <input type="text" placeholder="验证码" value="" />
                </div>
              </li>
            </ul>
            <button className="button button-fill">登录</button>
          </form>
          <section className="section-tip">
            <p>
               
            </p>
          </section>
          
           
        </div>
      </div>
    );
  }
  
}

module.exports = QuickLoginPage
