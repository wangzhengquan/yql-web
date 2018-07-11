import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
import ImageCliper from 'react-ui/image-cliper'
import Ajax from '../../ajax'
import List from 'react-ui/lists'
import Modals from 'react-ui/modals'
import t7 from 'react-ui/template'
import PARAMS from '../../params'

var hideNavbar = PARAMS.hideNavbar
require('../../resources/less/header-banner-editor.less')

var UPLOAD_STATUS = {
  success: 'success',
  error: 'error',
  uploading: 'uploading'
}

 

class HeaderBannerEditorArea extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	data: this.props.value
	  }
	}

	onSelectImage(event){
	    var files =[].slice.call(event.target.files, 0),
	        file = files[0];

	    var onClip =  (blob, fileName) => {
	      Modals.showIndicator()
	      var url = URL.createObjectURL(blob);
	      var data = this.state.data;
	      data.url = url;
	      data.file = blob;
	      this.setState({
	        data : data
	      })

	      Ajax.postFormData({
	          url: '/oss/uploadFile',
	          data: {
		        name: fileName,
		        file: blob
		      }
	      }).then(([json]) => {
	      	if (!json.error) {
	          var data = this.state.data;
	          this.setState({
	          	uploadStatus: UPLOAD_STATUS.success
	          })
	          data.url = json.data.url
	          this.setState({
	            data: data
	          })
	        } else {
	          var data = this.state.data;
	          this.setState({
	          	uploadStatus: UPLOAD_STATUS.error
	          })
	          data.error = json.message
	          this.setState({
	            data: data
	          })
	        }
	        Modals.hideIndicator()
	      }, ([err]) => {
	      	var data = this.state.data;
	      	this.setState({
          		uploadStatus: UPLOAD_STATUS.error
            })
	        data.error = err.message
	        this.setState({
	          data: data
	        })
	        Modals.hideIndicator()
	      })
	    }

	    ImageCliper.imageCliper({
	      file: file,
	      onClip: onClip,
	      ratio:2
	    }).open()
	    event.target.value = ''
	}
  	render(){
	    return (
	    <span>
		    <div className="page-content">
			  <List>
			  	<div className="header-image-wrapper">
			  		<img src={this.state.data.url}/>
			  	</div>
			  	<a href="#" className="item-link item-content file-selector">
			  		<div className="item-inner"><div className="item-title">更换社招图片</div></div>
			  		<input type="file" name="file" accept="image/*" onChange={this.onSelectImage.bind(this)}/>
			  	</a>
			  </List>
			</div>
			<div className="toolbar" style={{bottom: '44px'}}>
			  	<div className="toolbar-inner single-button-toolbar-inner" >
			  		<a disabled= {this.state.uploadStatus === UPLOAD_STATUS.success ? '' : 'disabled'} onClick={this.props.onOk} className="button button-fill button-enter">完成</a>
			  	</div>
		  	</div>
		</span>
	    )
  	}
}

var HeaderBannerEditor = {
	open (option) {
	    window.mainView = window.mainView || Views.addView('.view-main', {
	        // Enable Dynamic Navbar for this view
	        dynamicNavbar: true
	    });
	    
	    let res = window.mainView.router.loadContent(t7.compile(
	        '<div class="view">'+
	        '{{#unless hideNavbar}}'+
	        '<!-- Top Navbar-->' +
	        '<div class="navbar">' +
	        '  <div class="navbar-inner">' +
	        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
	        '    <div class="center sliding">' + ((option && option.title) || '编辑社招图片') + '</div>' +
	        '  </div>' +
	        '</div>' +
	        '{{/unless}}'+
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page header-banner-editor-page  {{#if hideNavbar}}no-navbar {{else}} navbar-through{{/if}}  toolbar-through">' +
	        '  </div>' +
	        '</div>' +
	        '</div>' 
	    )({
	    	hideNavbar: hideNavbar
	    }))

	    let page = res[1]
	    var onOk = (event) => {
	      var isLink = event.target.nodeName.toLowerCase() === 'a';
	      if(isLink) event.preventDefault()
	  	  $(page).trigger('ok', {value: editorArea.state.data})
	      window.mainView.back()
	    }

	    var editorArea = ReactDOM.render(<HeaderBannerEditorArea onOk={onOk} value={option && option.value ? option.value : null} />, page)
	    
	    return res
    }
}
export default HeaderBannerEditor;