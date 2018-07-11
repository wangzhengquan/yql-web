import React  from 'react';
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List} from 'react-ui/lists'
import ImageCliper from 'react-ui/image-cliper'
import FileUpload from '../../services/FileUpload'
import Auth from '../../services/Auth'
import TextFieldEditorView from 'react-ui/widget/textfield-editor'
import TextEditorView from 'react-ui/widget/textarea-editor'
import Ajax from '../../ajax'
import history from '../../history'
require('../../resources/less/me-page.less');
class MePage extends AnimationPage{
  
    constructor(props) {
      super(props);
      this.state = {
        data: Auth.getCommunity()
      }
    }

    init(){

    }


    handleOpenImageCliper(event){
      var files =[].slice.call(event.target.files, 0),
          file = files[0];
      var me = this;
      var onClip =  (blob) => {
        var data = this.state.data;
        data.url = URL.createObjectURL(blob);
        me.setState({
          data : data
        })
        FileUpload.upload({
          name: file.name,
          file: blob
        }).then(function([json]){
          if(json.error){
             window.alert('上传失败')
             return
          }
          var url = json.data.url;
          me.updateProperty('logo', url);

        })
        
      }

      ImageCliper.imageCliper({
        type: 'page',
        file: file,
        onClip: onClip,
        ratio:1
      }).open()
      event.target.value = ''
    }

    handleOpenTextFieldEditor(title,name,maxLength, e){
      e.preventDefault()
      // var me = this;
      TextFieldEditorView.open({
        title: title,
        value: this.state.data[name],
        maxLength: maxLength,
        onOk:  (value) => {
          // alert(value)
          this.updateProperty(name, value)          
        }

      })

    }

    handleOpenTextEditor(title,name,maxLength,e){
      e.preventDefault();
      TextEditorView.open({
        title: title,
        value: this.state.data[name],
        maxLength: maxLength,
        onOk:  (value) => {
          // alert(value)
          this.updateProperty(name, value)          
        }

      })
    }

    updateProperty(name, value){
      Ajax.ajax({
        url: 'community/'+this.state.data.id+'/update-property',
        method: 'PUT',
        data: {
          name: name,
          value: value
        },
        success: (json) => {
          if(json.error){
            return;
          }
          var data = this.state.data;
          data[name] = value;
          this.setState({
            data: data
          })
        }
      })
      
    }

    handleQuite(e) {
      e.preventDefault()
      Auth.logout()
      history.push('/login')
    }
    
    render(){
      return (
        <div className={classNames('page me-page', this.props.className)}>
          <div className="page-content">
            <List style={{marginTop: '10px'}}>
              <div className="item-content item-link">
                <div className="item-inner item-logo"> 
                  <input type="file" name="logo-file" accept="image/*"  onChange={this.handleOpenImageCliper.bind(this)}/>
                  <div className="item-title">LOGO</div>
                  <div>
                    <div className="logo-wrapper">
                      <img src={this.state.data.logo}/>
                    </div>
                  </div>
                </div>
              </div> 

              <a className="item-content item-link" onClick={this.handleOpenTextFieldEditor.bind(this,'社团名称','name', 17)}>
                <div className="item-inner"> 
                  <div className="item-title label">社团名称</div>
                  <div className="item-input">
                  {this.state.data.name}
                  </div>
                </div>
              </a>  

              <a className="item-content item-link" onClick={this.handleOpenTextFieldEditor.bind(this,'口号/宣言','schame', 20)}>
                <div className="item-inner"> 
                  <div className="item-title label">口号/宣言</div>
                  <div className="item-input">
                  {this.state.data.schame}
                  </div>
                </div>
              </a> 
                {
                 /*<li className="align-top">
                  <a onClick={this.handleOpenTextEditor.bind(this, '详细介绍', 'desc', 1000)} className="item-content item-link">
                    <div className="item-inner"> 
                      <div className="item-title label">详细介绍</div>
                      <div className="item-input">
                      {this.state.data.desc}
                      </div>
                    </div>
                  </a>
                </li>*/ 
                }

                
                
              </List>

              <div style={{margin: '30px 10px 0'}} >
                <a onClick={this.handleQuite.bind(this)} style={{backgroundColor: '#fff', color: '#ff3b30'}} className="button button-fill">退出登录</a>
              </div>
          </div>
        </div>

      );
    }
}

module.exports = MePage