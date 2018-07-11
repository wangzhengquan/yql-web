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
import DateUtil from 'react-ui/date'
require('../../resources/less/me-page.less');
require('react-ui/resources/less/forms.less');
class MePage extends AnimationPage{
  
    constructor(props) {
      super(props);
      var data = Auth.getUser();
      if(!data.avatar){
        data.avatar = '../../resources/svg/avatar-none.svg'
      }
      if(data.birthday){
        data.birthday = DateUtil.format(new Date(data.birthday), 'yyyy-mm-dd')
      }
      this.state = {
        data: data
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
          me.updateProperty('avatar', url);

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

    
    updateProperty(name, value, format){
      Ajax.ajax({
        url: 'user/'+this.state.data.id+'/update-property',
        method: 'PUT',
        data: {
          name: name,
          value: value,
          format: format
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
    
    render(){
      return (
        <div className={classNames('page me-page', this.props.className)}>
          <div className="page-content">
            <List style={{marginTop: '10px'}}>
              <div className="item-content item-link">
                  <div className="item-inner item-logo">
                    <input type="file" name="logo-file" accept="image/*"  onChange={this.handleOpenImageCliper.bind(this)}/>
                    <div className="item-title">头像</div>
                    <div>
                      <div className="logo-wrapper">
                        <img src={this.state.data.avatar}/>
                      </div>
                    </div>
                  </div>
                </div>

                <a className="item-content item-link" onClick={this.handleOpenTextFieldEditor.bind(this,'名称','realname', 17)}>
                  <div className="item-inner">
                    <div className="item-title">名字</div>
                    <div className="item-after">
                    {this.state.data.realname}
                    </div>
                  </div>
                </a>

                <div className="item-content item-link" >
                  <div className="item-inner">
                    <div className="item-title">性别</div>
                    <div className="item-after">
                      <select value={this.state.data.sex || ''} onChange={this.handleChangeSex.bind(this)}  style={{height: 'auto'}}>
                        <option value=''>性别</option>
                        <option value='1'>男</option>
                        <option value='0'>女</option>
                      </select>
                    </div>
                  </div>
                </div>
                <li>
                  <a  className="item-content item-link">
                    <div className="item-inner">
                      <div className="item-title">出生年月</div>
                      <div className="item-after">
                      <input type="date" placeholder="出生年月"  onChange={this.handleChangeBirthday.bind(this)} style={{height: 'auto'}} value={this.state.data.birthday? this.state.data.birthday: ''} />
                     
                      </div>
                    </div>
                  </a>
                </li>
              </List>
          </div>
        </div>

      );
    }

    handleChangeSex(event){
      event.preventDefault;
      var value = event.target.value;

      this.updateProperty('sex', value);
    }

    handleChangeBirthday(event){
      event.preventDefault;
      var value = event.target.value;
      this.updateProperty('birthday', value, 'yyyy-mm-dd');
    }

}

module.exports = MePage