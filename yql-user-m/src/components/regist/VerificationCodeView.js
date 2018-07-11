import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import SetPasswordView from './SetPasswordView';
import Ajax from '../../ajax'

class VerificationForm extends React.Component{
    constructor(props) {
      super(props);
      this.params = props.params;
      this.tokenStorageKey = this.params.tokenStorageKey
      this.state = {
        restTime: 60
      }
       
    }

    componentDidMount(){
      this.waitingForInput()
    }

    waitingForInput(){
      this.setState({
        restTime: 60
      })
      var timer = window.setInterval(() => {
        this.setState(function(previousState, currentProps) {
          return {restTime: previousState.restTime - 1};
        }, () => {
          if(this.state.restTime <= 0){
            clearInterval(timer)
            timer = null;
          }
        });
      }, 1000)
    }

    handleClickGetVerifyCode(e){
      e.preventDefault()
      var me = this;
      var  mobile =  me.props.mobile
      Ajax.ajax({
        method: 'GET',
        url: 'sms-code/get',
        data: {
          mobile: mobile,
          action: me.params.action
        }
      }).then(function([json]){
        if(json.error) {
          return;
        }
        me.waitingForInput()
      })
    }

    handleNextStep(e){
      e.preventDefault()
      if(!this.state.validate) return;
      var me = this;
      Ajax.ajax({
        method: 'GET',
        url: 'sms-code/verify',
        data: {
          mobile: me.props.mobile,
          code: me.state.value,
          action: me.params.action
        }
      }).then(([json]) => {
        if(!json.error){
          sessionStorage.setItem(me.tokenStorageKey, json['token'])
          SetPasswordView.open({
            mobile: me.props.mobile,
            params: me.params
          })
        }

      })
       
      
    }


    render() {
       return (
        <div className="page-content">
          <div className="regitst-form">
            <div className="item-tips">
              <div  className="message">我们已经发送了校验码到您的手机:</div>
              <div  className="mobile-num"> {this.props.mobile}</div>
            </div>
 
           
            <div className="item-input-content">
              <div className="item-title label">校验码</div>
              <div className="item-input">
                <input type="text" placeholder="短信校验码" ref="code" maxLength="6" value={this.state.value || ''} onChange={this.handleChange.bind(this)}/>
              </div>
              {
                this.state.restTime > 0 ? 
                  <div className="verycode-button" style={{color: '#a9a9a9'}}>{this.state.restTime}秒可重发</div> :
                  <button className="verycode-button" onClick={this.handleClickGetVerifyCode.bind(this)}>重新获取</button>
              }
              
            </div>

            <div className="item-button-content item-content">
              <div  className="item-inner">
                 <button className="button button-fill" disabled={!this.state.validate} onClick={this.handleNextStep.bind(this)}>下一步</button>
              </div>
            </div>

          </div>
           
        </div>
        );

    }

    handleChange(e){
      var value = e.target.value.trim()
      this.setState({
        value: value,
        validate: value.length === 6
      })
    }

     
}
var VerificationCodeView = {
  open (option) {
      window.mainView = window.mainView || Views.addView('.view-main', {
          // Enable Dynamic Navbar for this view
          dynamicNavbar: true
      });
      
      let res = window.mainView.router.loadContent(
          '<!-- Top Navbar-->' +
          '<div class="navbar">' +
          '  <div class="navbar-inner">' +
          '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
          '    <div class="center sliding">' + ((option && option.title) || '填写验证码') + '</div>' +
          '  </div>' +
          '</div>' +
          '<div class="pages">' +
          '  <!-- Page, data-page contains page name-->' +
          '  <div class="page banner-editor-page navbar-through toolbar-through">' +
          '    <!-- Scrollable page content-->' +
          '  </div>' +
          '</div>'
      );

      let page = res[1]

      ReactDOM.render(<VerificationForm params={option.params} mobile={option.mobile}/>, page)
      
      return res
    }
}
export default VerificationCodeView;