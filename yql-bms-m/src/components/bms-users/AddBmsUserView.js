import React  from 'react';
import ReactDOM from 'react-dom'
import {List} from 'react-ui/lists'
import JSEncrypt from  'react-ui/encrypt-rsa.js'
import pubkey from '../../resources/certificate/server_rsa_512_pub.js'
import Ajax from '../../ajax'
import Navbars from 'react-ui/navbars'
import $ from 'react-ui/dom'
require('react-ui/resources/less/forms.less')

class AddBmsUserView extends React.Component{

	constructor(props) {
      super(props);
      this.state = {
      	data: {}
      }
    }

    componentDidMount(){
    	var node = $(ReactDOM.findDOMNode(this));
    	Navbars.sizeNavbar(node.find('.navbar-inner'))
    }

    onOk(e){
    	e.preventDefault()
    	var data = this.state.data
    	var password = data.password
    	var encrypt = new JSEncrypt({
	      default_key_size: 512
	    });
	    encrypt.setPublicKey(pubkey);
	    password = encrypt.encrypt(password)
	    data.password = password
	    
	    Ajax.ajax({
	    	url: '/bms-user/create',
	    	method: 'POST',
	    	contentType: 'applicaton/json',
     		data: JSON.stringify(this.state.data),
     		success: (json) => {
     			this.props.onOk && this.props.onOk(json.data)
     		}
	    })
    }

    onCancel(e){
    	e.preventDefault()
    	this.props.onCancel && this.props.onCancel()
    }

	render(){
		return (
		<div className="view navbar-fixed">
	        <div className="pages">
	          <div className="page">
	            <div className="navbar">
	              <div className="navbar-inner">
	              	<div className="left"><a href="#" onClick={this.onCancel.bind(this)} className="link cancel">取消</a></div>
	                <div className="center">新增用户</div>
	                <div className="right"><a href="#" onClick={this.onOk.bind(this)} className="link ok">确定</a></div>
	              </div>
	            </div>
	            <div className="page-content">
	               <List>
	               		<div className="item-content">
	               			<div className="item-inner">
	               				<div className="item-title label">用户名</div>
	               				<div className="item-input">
	               					<input type="text" placeholder="用户名" value={this.state.data.username || ''} onChange={this.handleUsernameChange.bind(this)} />
	               				</div>
	               			</div>
	               		</div>

	               		<div className="item-content">
	               			<div className="item-inner">
	               				<div className="item-title label">密码</div>
	               				<div className="item-input">
	               					<input type="text" placeholder="密码"  value={this.state.data.password || ''} onChange={this.handlePasswordChange.bind(this)} />
	               				</div>
	               			</div>
	               		</div>
	               </List>
	            </div>
	          </div>
	        </div>
	    </div>
		)
	}

	handleUsernameChange(e) {
		var data = this.state.data;
		data.username= e.target.value;
		this.setState({
			data: data
		})
	}

	handlePasswordChange(e) {
		var data = this.state.data;
		data.password= e.target.value;
		this.setState({
			data: data
		})
	}

}

export default AddBmsUserView;