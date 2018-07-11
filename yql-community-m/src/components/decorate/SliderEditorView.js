import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
import Ajax from '../../ajax'
import ImageUtil from '../../util/Images'
import List from 'react-ui/lists'
import Constants from '../../constants/index';
import t7 from 'react-ui/template'
import PARAMS from '../../params'

var hideNavbar = PARAMS.hideNavbar
require('../../resources/less/banner-editor.less')
require('react-ui/resources/less/forms.less')
var UPLOAD_STATUS = {
  success: 'success',
  error: 'error',
  uploading: 'uploading'
}
class Toolbar extends React.Component{
    constructor(props) {
      super(props);
    }
     
    render(){
       return (
       		<div className="toolbar-inner single-button-toolbar-inner" ><a onClick={this.props.onOk} className="button button-fill button-enter">完成</a></div>
       )

    }
}

class BannerEditorArea extends React.Component{
    constructor(props) {
      super(props);
      this.data = this.props.value || [
          {
            url: null,
            link: ''
          }, {
            url: null,
            link: ''
          }

        ];
      this.state = {
      	data: this.data 
      }
    }

    handleAddItem(event) {
      event.preventDefault()
      var data = this.state.data;
      data.push({
        url: null,
        link: ''
      })
      this.setState({
        data: data
      })
    }

    handleRemoveItem(index, event){
      event.preventDefault()
      var data = this.state.data;
      data.splice(index, 1)
      this.setState({
        data: data
      })
    }

    handleUploadImg(item, event) {
      var files = [].slice.call(event.target.files, 0),
        file = files[0];
      if(file.size > Constants.MAX_UPLOAD_SIZE){
        window.alert('上传文件最大为' + (Constants.MAX_UPLOAD_SIZE/Math.pow(2, 20) )+'M')
        return
      }
      event.target.value = ''
      var url = URL.createObjectURL(file);

     //  var data =this.state.data
     //  item.url = url;
     //  item.uploadStatus =  UPLOAD_STATUS.uploading
     // // item.error = '出错了'
     //  this.setState({
     //    	data: data
     //  })



      ImageUtil.getImageSize(url).then(([width, height]) => {
      	var data = this.state.data;
      	Object.assign(item, {
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
        item.uploadStatus = UPLOAD_STATUS.error
        delete item.file
        item.error = err.message
        this.setState({
          data: data
        })
      }).then(([json]) => {
        if (!json.error) {
          var data = this.state.data;
          item.uploadStatus = UPLOAD_STATUS.success
          item.url = json.data.url
          this.setState({
            data: data
          })
        } else {
          var data = this.state.data;
          item.uploadStatus = UPLOAD_STATUS.error
          item.error = json.message
          this.setState({
            data: data
          })
        }

      }, ([err]) => {
      	var data = this.state.data;
        item.uploadStatus = UPLOAD_STATUS.error
        item.error = err.message
        this.setState({
          data: data
        })
        console.error('uplaod err', err)
      })
    }


    render() {
       return (
        <div>
        {this.state.data.map( (item, index) => (
          <List className="list-block" key={index}>
            <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">图片:</div>
                  {index > 0 ? <a className="item-after" style={{color: 'red'}} onClick={this.handleRemoveItem.bind(this, index)}>删除</a> : ''}
                </div>
              </div>
            {
            ((item) => {
              if (item.url) {
                return (
                  <div className="image-item">
                    <div className="image-wrapper">
                      <img src={item.url}/>
                      {item.uploadStatus === UPLOAD_STATUS.uploading ?
                                (
                                <div className="modal-overlay modal-overlay-visible">
                                  <div className="preloader-indicator-modal"><span className="preloader preloader-white"></span></div>
                                </div>
                                ) : ''
                              }

                              {item.uploadStatus === UPLOAD_STATUS.error ?
                                (
                                <div className="modal-overlay modal-overlay-visible" style={{zIndex: 1}}>
                                  <div className="preloader-indicator-modal" style={{zIndex: 1, padding: '20px', color: '#fff'}}>
                                  <span className="upload-error-indicator">{item.error}</span>
                                  </div>
                                </div>
                                ) : ''
                              }
                    </div>
                     
                     <input type="file" name="file" accept="image/*" onChange={this.handleUploadImg.bind(this, item)}/>
                  </div>
                )
              } else {
                return (
                  <div className="image-item">
                    <div className="add-image-btn">
                      <span className="icon">+</span>
                    </div>
                     <input type="file" name="file" accept="image/*" onChange={this.handleUploadImg.bind(this, item)}/>
                  </div>
                )
              }
            })(item)
            }

            <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">链接到: </div>
                </div>
              </div>

              <div className="item-content">
                <div className="item-inner"> 
                  <div className="item-input">
                    <input type="text" onChange={this.handleChangeLinkInput.bind(this, item)} value={item.link} placeholder="链接"/>
                  </div>
                </div>
              </div>

          </List>
        ))
        }

        <div><a onClick={this.handleAddItem.bind(this)} className="button button-fill bg-green button-enter" style={{margin: '15px', height: '44px', lineHeight: '44px'}}>添加广告</a></div>
        </div>
      );
    }

    handleChangeLinkInput(item, event){
    	var data = this.state.data;
    	item.link = event.target.value;
    	this.setState({
    		data: data
    	})
    }
}
var SliderEditor = {
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
	        '    <div class="center sliding">' + ((option && option.title) || '编辑轮播图广告') + '</div>' +
	        '  </div>' +
	        '</div>' +
          '{{/unless}}'+
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page banner-editor-page {{#if hideNavbar}}no-navbar {{else}} navbar-through{{/if}}  toolbar-through">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content">' +
	        '    </div>' +
	        '    <div class="toolbar">' +
	        '    </div>' +
	        '  </div>' +
	        '</div>'
	    )({
        hideNavbar: hideNavbar
      }));

	    let page = res[1]

	    var editorArea = ReactDOM.render(<BannerEditorArea value={option && option.value ? option.value : null} />, page.querySelector('.page-content'))
	    var onOk = (event) => {
	      var isLink = event.target.nodeName.toLowerCase() === 'a';
	      if(isLink) event.preventDefault()
	  	  $(page).trigger('ok', {value: editorArea.state.data})
	      window.mainView.back()
	    }
	    ReactDOM.render(<Toolbar onOk={onOk}/>, page.querySelector('.toolbar'))
	    return res
    }
}
export default SliderEditor;