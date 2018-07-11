import React  from 'react';
import Page from 'react-ui/page'
import classNames from 'classnames'
import FileUpload from '../../services/FileUpload'
import List from 'react-ui/lists'
import Regist from '../../services/Regist'
// import {ResizableTextarea} from 'react-ui/forms'
import ImageCliper from 'react-ui/image-cliper'
import history from '../../history'
import Auth from '../../services/Auth'
import Notifications from 'react-ui/notifications'

require('../../resources/less/regist-page.less')
// require('react-ui/resources/less/lists.less');
require('react-ui/resources/less/forms.less');


class SetCommunityInfoPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      logged: undefined,
      data: {

        name: '',
        schame: '',
        desc: ''
      }
    }
  }

  componentWillMount(){
    // super.componentWillMount()
    // var me = this;
    // Auth.isLogged(function(logged){
    //   me.setState({
    //     logged: logged
    //   })
    // });
  }
   
  onSelectLogo(event){
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
        var data = me.state.data;
        data.logo = url;
        me.setState({
          data : data
        })

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

  check(data) {
    if(!data.name){
      Notifications.addNotification({
        title: '提示',
        message: '请填写社团名称！',
        hold: 4000
      });
      return false;
    }

    if(!data.schame){
      Notifications.addNotification({
        title: '提示',
        message: '请填写口号/宣言！',
        hold: 4000
      });
      return false;
    }

    return true;
    
  }

  handleOk (e) {
    e.preventDefault()
    var data = this.state.data;
    data.userId = Auth.getUserId();
    if(!this.check(data)){
      return;
    } 

    Regist.registCommunity(data, (suc) => {
      if(suc) {
        history.push(window.sessionStorage.getItem('nextPath') || '/')
        sessionStorage.removeItem('nextPath')
      }
    })
  }

  // nextStep(e){
  //   e.preventDefault()
  //   window.sessionStorage.setItem('community', JSON.stringify(this.state.data));

  //   history.push('/regist')
  // }
  

  render(){
    return (
      <div  className={classNames('page set-ommunity-info-page', this.props.className)}>
        <div className="page-content" ref="pageContent">
           
          <form className="rgeist-form">
            <List>
              <div className="item-content">
                <div className="item-inner item-logo"> 
                  <input type="file" name="logo-file" accept="image/*"  onChange={this.onSelectLogo.bind(this)}/>
                  <div className="item-title">LOGO</div>
                  <div>
                    <div className="logo-wrapper">
                      <img src={this.state.data.logo || require('../../resources/svg/avatar.svg')}/>
                    </div>
                  </div>
                </div>
              </div> 

              <div className="item-content">
                <div className="item-inner"> 
                  <div className="item-title label">社团名称</div>
                  <div className="item-input">
                    <input type="text" value={this.state.data.name} placeholder="社团名称" onChange={this.handleNameChange.bind(this)}/>
                  </div>
                </div>
              </div>  

              <div className="item-content">
                <div className="item-inner"> 
                  <div className="item-title label">口号/宣言</div>
                  <div className="item-input">
                    <input type="text" value={this.state.data.schame} placeholder="口号/宣言" onChange={this.handleSchameChange.bind(this)}/>
                  </div>
                </div>
              </div> 
              {
                /*
                <div className="item-content align-top">
                  <div className="item-inner"> 
                    <div className="item-title label">详细介绍</div>
                    <div className="item-input">
                      <ResizableTextarea value={this.state.data.desc} onChange={this.handleDescChange.bind(this)} placeholder="详细介绍"></ResizableTextarea>
                    </div>
                  </div>
                </div>
                 */
              }
              

            </List>
            <div style={{ padding: '0 15px'}}>
              <button className="button button-fill" onClick={this.handleOk.bind(this)} >完成</button>
            </div>
            
          </form>
        </div>
      </div>
    );
  }


  handleSchameChange(e){
    var data = this.state.data;
    data.schame = e.target.value;
    this.setState({
      data: data
    })
  }

  handleNameChange(e){
    var data = this.state.data;
    data.name = e.target.value;
    this.setState({
      data: data
    })
  }

  handleDescChange(e){
    var data = this.state.data;
    data.desc = e.target.value;
    this.setState({
      data: data
    })
  }
 
  
}

module.exports = SetCommunityInfoPage
