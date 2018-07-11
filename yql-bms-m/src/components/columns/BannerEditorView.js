import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
import Ajax from '../../ajax'
import ImageUtil from '../../util/Images'
import List from 'react-ui/lists'
import Constants from '../../constants/index';
require('../../resources/less/banner-editor.less')
require('react-ui/resources/less/forms.less')
var UPLOAD_STATUS = {
  success: 'success',
  error: 'error',
  uploading: 'uploading'
}
 

class BannerEditorArea extends React.Component{
    constructor(props) {
      super(props);
      this.data = this.props.value || {
        type: 'banner',
        contentEntity: [{
      		url: null,
      		link: ''
    	  }]
      }

      this.state = {
      	data:this.data
      }
    }

    componentDidUpdate(){
      this.props.onChange && this.props.onChange(this.state.data)
    }

    handleUploadImg(event) {
      var files = [].slice.call(event.target.files, 0),
        file = files[0];
      if(file.size > Constants.MAX_UPLOAD_SIZE){
        window.alert('上传文件最大为' + (Constants.MAX_UPLOAD_SIZE/Math.pow(2, 20) )+'M')
        return
      }
      event.target.value = ''
      var url = URL.createObjectURL(file);

      ImageUtil.getImageSize(url).then(([width, height]) => {
      	var data = this.state.data;
      	Object.assign(data.contentEntity[0], {
	      	url: url,
	      	uploadStatus: UPLOAD_STATUS.uploading,
	      	width: width,
	      	height: height
      	})
        this.setState({
        	data: data
        })
        return Ajax.postFormData({
          url: '/oss/uploadFile',
          data: {
  	        name: file.name,
  	        file: file
  	      }
        })
      }, (err) => {
      	var data = this.state.data
        data.contentEntity[0].uploadStatus = UPLOAD_STATUS.error
        delete data.contentEntity[0].file
        data.contentEntity[0].error = err.message
        this.setState({
          data: data
        })
      }).then(([json]) => {
        if (!json.error) {
          var data = this.state.data;
          data.contentEntity[0].uploadStatus = UPLOAD_STATUS.success
          data.contentEntity[0].url = json.data.url
          this.setState({
            data: data
          })
        } else {
          var data = this.state.data;
          data.contentEntity[0].uploadStatus = UPLOAD_STATUS.error
          data.contentEntity[0].error = json.message
          this.setState({
            data: data
          })
        }
      }, ([err]) => {
      	var data = this.state.data;
        data.contentEntity[0].uploadStatus = UPLOAD_STATUS.error
        data.contentEntity[0].error = err.message
        this.setState({
          data: data
        })
      })
    }


    render() {
       return (
       	<List className="list-block">
       		<div className="item-content">
	            <div className="item-inner">
	              <div className="item-title">图片:</div>
	            </div>
          	</div>
	   	  	{
		  		(() => {
		  			if (this.state.data.contentEntity[0].url) {
		  				return (
		  					<div className="image-item">
		  						<div className="image-wrapper">
		  							<img src={this.state.data.contentEntity[0].url }/>
		  							{this.state.data.contentEntity[0].uploadStatus === UPLOAD_STATUS.uploading ?
                      (
                      <div className="modal-overlay modal-overlay-visible">
                        <div className="preloader-indicator-modal"><span className="preloader preloader-white"></span></div>
                      </div>
                      ) : ''
                    }

                    {this.state.data.contentEntity[0].uploadStatus === UPLOAD_STATUS.error ?
                      (
                      <div className="modal-overlay modal-overlay-visible" style={{zIndex: 1}}>
                        <div className="preloader-indicator-modal" style={{zIndex: 1, padding: '20px', color: '#fff'}}>
                        <span className="upload-error-indicator">{this.state.data.contentEntity[0].error}</span>
                        </div>
                      </div>
                      ) : ''
                    }
		  						</div>
		  						 
		  						 <input type="file" name="file" accept="image/*" onChange={this.handleUploadImg.bind(this)}/>
		  					</div>
		  				)
		  			} else {
		  				return (
		  					<div className="image-item">
		  						<div className="add-image-btn">
		  						 	<span className="icon">+</span>
		  						</div>
		  						 <input type="file" name="file" accept="image/*" onChange={this.handleUploadImg.bind(this)}/>
		  					</div>
		  				)
		  			}
		  		})()
	   	  	}

	   	  	<div className="item-content">
	            <div className="item-inner">
	              <div className="item-title">链接到: </div>
	            </div>
          	</div>

          	<div className="item-content">
              <div className="item-inner"> 
                <div className="item-input">
                  <input type="text" onChange={this.handleChangeLinkInput.bind(this)} value={this.state.data.contentEntity[0].link} placeholder="链接"/>
                </div>
              </div>
            </div>

       	</List>
       	);

    }

    handleChangeLinkInput(event){
    	var data = this.state.data;
    	data.contentEntity[0].link = event.target.value;
    	this.setState({
    		data: data
    	})
    }
}
var BannerEditor = {
	open (option) {
      option = option || {}
	    window.mainView = window.mainView || Views.addView('.view-main', {
	        // Enable Dynamic Navbar for this view
	        dynamicNavbar: true
	    });
	    
	    let res = window.mainView.router.loadContent(
	        '<!-- Top Navbar-->' +
	        '<div class="navbar">' +
	        '  <div class="navbar-inner">' +
	        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
	        '    <div class="center sliding">' + ((option && option.title) || '编辑图片广告') + '</div>' +
          '    <div class="right sliding"><a class="ok link" disabled="disabled"><span>确定</span></a></div>' +
	        '  </div>' +
	        '</div>' +
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page banner-editor-page navbar-through toolbar-through">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content">' +
	        '    </div>' +
	        '    <div class="toolbar">' +
	        '    </div>' +
	        '  </div>' +
	        '</div>'
	    );

	    let page = res[1], navbar = res[0]
      let okButton = $(navbar).find('a.ok')
      var onChange = (value) => {
        if(!value.contentEntity[0].url) {
          okButton.attr('disabled', 'disabled')
        } else {
          okButton.removeAttr('disabled')
        }
      }
	    var editorArea = ReactDOM.render(<BannerEditorArea onChange={onChange} value={option.value} />, page.querySelector('.page-content'))
	    var onOk = (event) => {
	      event.preventDefault()
        if(event.target.hasAttribute('disabled')){
          return;
        }
	  	  $(page).trigger('ok', {value: editorArea.state.data})
        option.onOk && option.onOk(editorArea.state.data)
	      window.mainView.back()
	    }
      okButton.on('click', onOk)
	    // ReactDOM.render(<Toolbar onOk={onOk}/>, page.querySelector('.toolbar'))
	    return res
    }
}
export default BannerEditor;