import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import List from 'react-ui/lists'
import JSEncrypt from  'react-ui/encrypt-rsa.js'
import pubkey from '../../resources/certificate/server_rsa_512_pub.js'
import Ajax from '../../ajax'

var valPassword = function(pwd, cb){
    if(pwd.length < 8 || pwd.length > 20){   
    	cb && cb(false, '密码长度应为8－20个字符') 
        return false;
    }    
    if(!/\d+/g.exec(pwd)){   
    	cb && cb(false, '密码中应包含数字')  
        return false;
    }
    if(!/[a-zA-Z]+/gi.exec(pwd)){  
    	cb && cb(false, '密码中应包含字母')   
        return false;
    }
    if(/[!@#$%^&*()]+/g.exec(pwd)){
    	cb && cb(false, '密码中不能包含!@#$%^&*()等特殊字符') 
        return false;
    }   
    cb && cb(true) 
    return true;
}
class UserForm extends React.Component{
    constructor(props) {
      super(props);
      this.state = {}
      this.params = props.params
      this.tokenStorageKey = this.params.tokenStorageKey
      this.tokenHeaderKey = this.params.tokenHeaderKey
      this.url = this.params.url
      this.method = this.params.method
    }


     

    handlClickFinished(e){
    	e.preventDefault()
    	var me = this;
    	var password = me.refs.password.value.trim()
    		// repeatPassword = me.refs.repeatPassword.value.trim();

    	if(valPassword(password, (validate, message) => {
    		this.setState({
    			message: message,
    			validate: validate
    		})
    	})){

   //  		if(password != repeatPassword) {
			// 	this.setState({
			// 		message: '两次输入密码不一致',
			// 		validate: false
			// 	})
			// 	return;
			// } else {
			// 	this.setState({
			// 		message: undefined,
			// 		validate: true
			// 	})

			// }

    	} else {
    		return;
    	}


    	var encrypt = new JSEncrypt({
	      default_key_size: 512
	    });
	    encrypt.setPublicKey(pubkey);
	    password = encrypt.encrypt(password)

	    var headers = {}
	    headers[me.tokenHeaderKey] = sessionStorage.getItem(this.tokenStorageKey)
	    Ajax.ajax({
	      method: me.method,
	      url: me.url,
	      headers: headers,
	      data: {
	      	mobile: me.props.mobile,
	      	password: password
		  }
	    }).then(function([json]) {
	      if (json.error) return;
	      if(json.token) {
	      	localStorage.setItem('token' , json.token)
          location.href = '/regist-community-info'
	      	// location.replace(window.sessionStorage.getItem('nextPath') || '/');
	      } else {
	      	location.href = '/login'
	      }
        	
	    })
    }

    render() {
       return (
        <div className="page-content">
       	 	{
        	this.state.message ? <div className="error-message">{this.state.message}</div> : ''
        	}
        	
       		<List style={{margin: '15px 0'}}>
             
            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label">密码</div>
                <div className="item-input">
                  <input type="text" placeholder="包含字母和数字的8-20位字符， 不能包含!@#$%^&*()等特殊字符" ref="password"  />
                </div>
              </div>
            </div>

            
          </List>
          <div style={{ padding: '0 15px'}}>
            <button className="button button-fill" onClick={this.handlClickFinished.bind(this)}>完成</button>
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

	    ReactDOM.render(<UserForm params={option.params} mobile={option.mobile} />, page)
	   
	    return res
    }
}
export default SetPasswordView;