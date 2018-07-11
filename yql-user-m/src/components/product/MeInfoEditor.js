import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
import List from 'react-ui/lists'
import {DateField} from 'react-ui/forms'
require('../../resources/less/me-page.less')

class Editor extends React.Component{
    constructor(props) {
      super(props);
      var data = this.props.data;
      // data.birthday = DateUtil.format(new Date(data.birthday), 'yyyy-MM-dd')
      this.state = {
      	data: data
      }
      console.log('data====', data)
    }

    
     
    render(){
       return (
       	<List style={{marginTop: '10px'}}>
        <div className="item-content">
          <div className="item-inner">
            <div className="item-title label">名字</div>
            <div className="item-input">
            	<input type="text" value={this.state.data.realname}  onChange={this.handleChangeRealname.bind(this)}/>
            </div>
          </div>
        </div>

        <div className="item-content" >
          <div className="item-inner">
            <div className="item-title label">性别</div>
            <div className="item-input">
              <select value={this.state.data.sex || ''} onChange={this.handleChangeSex.bind(this)}  style={{height: 'auto'}}>
                <option value=''>性别</option>
                <option value='1'>男</option>
                <option value='0'>女</option>
              </select>
            </div>
          </div>
        </div>
        <li>
          <div className="item-content">
            <div className="item-inner">
              <div className="item-title label">出生年月</div>
              <div className="item-input">
              <DateField type="date"  placeholder="出生年月"  onChange={this.handleChangeBirthday.bind(this)} style={{height: 'auto'}} value={this.state.data.birthday} format="yyyy-MM-dd"/>
             
              </div>
            </div>
          </div>
        </li>
      </List> );

    }

    handleChangeRealname(e){
    	e.preventDefault();
    	var data = this.state.data;
    	var oldValue = data.realname;
    	var newValue = e.target.value;
    	data.realname = newValue
    	this.setState({
    		data: data
    	})
    	this.props.onChange && this.props.onChange('realname', newValue, oldValue, this.state.data)
    }

    handleChangeSex(e){
     	e.preventDefault();
    	var data = this.state.data;
    	var oldValue = data.sex;
    	var newValue = e.target.value;
    	data.sex = newValue
    	this.setState({
    		data: data
    	})
    	this.props.onChange && this.props.onChange('sex', newValue, oldValue, this.state.data)
    }

    handleChangeBirthday(e){
      	e.preventDefault();
    	var data = this.state.data;
    	var oldValue = data.birthday;
    	var newValue = e.target.value;
    	data.birthday = newValue
    	this.setState({
    		data: data
    	})
    	this.props.onChange && this.props.onChange('birthday', newValue, oldValue, this.state.data)
    }

}

class EditorToolbar extends React.Component{

    constructor(props) {
      super(props);
    }
     
    render(){
       return (
       	<div className="toolbar-inner single-button-toolbar-inner" >
       		<a onClick={this.props.onOk} className="button button-fill bg-green button-enter disabled">完成</a>
       	</div>
       )

    }
}
 



var MeInfoEditor = {
	open (option) {
		var defaultOption = {
			 
		}
		if(!option){
			option = defaultOption
		}else{
			for(var p in defaultOption){
				if(option[p] === undefined){
					option[p] = defaultOption[p]
				}
			}
		}
	    window.mainView = window.mainView || Views.addView('.view-main', {
	        // Enable Dynamic Navbar for this view
	        dynamicNavbar: true
	    });
	    
	    let res = window.mainView.router.loadContent(
	        '<!-- Top Navbar-->' +
	        '<div class="navbar">' +
	        '  <div class="navbar-inner">' +
	        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i></a></div>' +
	        '    <div class="center sliding">' + ((option && option.title) || '填写报名信息') + '</div>' +
	        '  </div>' +
	        '</div>' +
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page text-editor-page navbar-through toolbar-through">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content"> </div>' +
	        '    <div class="toolbar"></div>' +
	        '  </div>' +
	        '</div>'
	    );

	    let page = res[1]
	    let navbar = res[0]
	    let $navbar = $(navbar);
	    let btnOk = $navbar.find('a.link.ok')
	    var onChange = function(pname, newValue, oldValue, data){
	    	var disabled = false
	    	if(!data.realname || !data.birthday || !data.sex){
	    		disabled = true
	    	}
	    	if(!disabled){
	    		$(page).find('.toolbar .button').removeClass('disabled');
	    	} else {
	    		$(page).find('.toolbar .button').addClass('disabled');
	    	}

	    }
	    var editor = ReactDOM.render(<Editor onChange={onChange} data={option.data} />, page.querySelector('.page-content'))

	    var onOk = function(e){
	    	e.preventDefault()
	    	if(btnOk.hasClass('disabled')){
	    		return;
	    	}
	    	if(option.onOk) option.onOk(editor.state.data)
	    	window.mainView.back();

	    }

	    ReactDOM.render(<EditorToolbar onOk={onOk}/>, page.querySelector('.toolbar'))
	    return res
    }
}
export default MeInfoEditor;