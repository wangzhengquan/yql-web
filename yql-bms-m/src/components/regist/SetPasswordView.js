import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import List from 'react-ui/lists'
import JSEncrypt from  'react-ui/encrypt-rsa.js'
import pubkey from '../../resources/certificate/server_rsa_512_pub.js'
import Regist from '../../services/Regist'
class UserForm extends React.Component{
    constructor(props) {
      super(props);
       
    }

    handleNextStep(e){
    	e.preventDefault()
    	var me = this;
    	var password = me.refs.password.value;
    	var encrypt = new JSEncrypt({
	      default_key_size: 512
	    });
	    encrypt.setPublicKey(pubkey);
	    password = encrypt.encrypt(password)

	    Regist.setPassword({
	      	mobile: me.props.mobile,
	      	password: password

	    }, function(suc, user){
	      	if(suc) location.href =('/regist-community-info/');
	    });
    	 
    	
    }


    render() {
       return (
        <div className="page-content">
       		<List style={{margin: '15px 0'}}>
             
            <div className="item-content">
              <div className="item-inner"> 
                <div className="item-title label">密码</div>
                <div className="item-input">
                  <input type="passwrod" placeholder="6-20位字母或数字" ref="password"/>
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
var SetPasswordView = {
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
	        '    <div class="center sliding">' + ((option && option.title) || '设置用户密码') + '</div>' +
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

	    ReactDOM.render(<UserForm mobile={option.mobile} />, page)
	   
	    return res
    }
}
export default SetPasswordView;