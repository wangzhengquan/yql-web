import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import List from 'react-ui/lists'
import SetPasswordView from './SetPasswordView';
import Regist from '../../services/Regist'

class VerificationForm extends React.Component{
    constructor(props) {
      super(props);
       
    }

    handleNextStep(e){
      e.preventDefault()
      var me = this;
      Regist.verifyCode( {
      	mobile: me.props.mobile,
        code: me.refs.code.value
      }, function(suc){
      	if(suc) {
      	   SetPasswordView.open({
	      	 mobile: me.props.mobile
	       })
      	}
      });
       
      
    }


    render() {
       return (
        <div className="page-content">
       		<List style={{margin: '0 0 15px'}}>
            <div className="item-divider">
              请输入手机号****收到的短信校验码
            </div>
            <div className="item-content">
              <div className="item-inner"> 
                <div className="item-title label">校验码</div>
                <div className="item-input">
                  <input type="text" placeholder="短信校验码" ref="code"/>
                </div>
              </div>
            </div>
          </List>
          <div style={{ padding: '0 15px'}}>
            <button className="button button-fill" onClick={this.handleNextStep.bind(this)}>下一步</button>
          </div>
        </div>
       	);

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

	    ReactDOM.render(<VerificationForm  mobile={option.mobile}/>, page)
	    
	    return res
    }
}
export default VerificationCodeView;