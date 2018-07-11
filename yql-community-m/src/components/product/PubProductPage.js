import React  from 'react';
import ReactDOM from 'react-dom';
import Page from 'react-ui/page'
import Ajax from '../../ajax'
import classNames from 'classnames'
import List from 'react-ui/lists'
import $ from 'react-ui/dom'
import CitySelectView from '../widget/CitySelectView'
import EditorView from 'react-ui/widget/textarea-editor'
import RichTextEditorView from '../widget/RichTextEditorView'
import CategorySelectView from '../widget/CategorySelectView'
import DatetimePicker from '../widget/DatetimePicker'
import Auth from '../../services/Auth'
import history from '../../history'
import {ResizableTextarea, DateField} from 'react-ui/forms'
import Notifications from 'react-ui/notifications'
import Modals from 'react-ui/modals'
import base64url from 'base64url'
require('../../resources/less/pub-product-page.less')
var UPLOAD_STATUS = {
  success: 'success',
  error: 'error',
  uploading: 'uploading'
}

var ACTIONS = {
  create: 'crete',
  update: 'update',
  recovery: 'recovery',
  none: false
}
var getImageSize = function(url, suc, error){
  return new Promise(function(resolve, reject) {
    function onLoad() {
      
      resolve([image.width, image.height])
      suc && suc(image.width, image.height)
    }
    var image = new Image();
    image.onload = onLoad;
    image.onerror = function() {
      var exception = new Error('Could not load image at ' + url);
      error && error(exception);
      reject(exception);
    };
    image.src =url;
  });
}

class PubProductPage extends Page{
  constructor(props) {
    super(props);
    this.data = {name: '', desc: '', price: 0, limit: undefined,  images: [], mobile: Auth.user.mobile}
    this.state = {
      data: this.data,
      autocompleteAddressList: [],
      action: ACTIONS.create
    }

    // console.log("this.props", this.props)
  }

  init( cb ){
    var me = this;
    if(this.props.params.id){
      Ajax.ajax({
        url: 'product/'+this.props.params.id,
        method: 'GET',
        success:  (json) => {
          if(json.error){
            cb && cb(false)
            return;
          }
          var data = json.data;
          var newimages = []
          data.images.forEach((item) => {
            newimages.push({
              url: item
            })
          })
          data.images = newimages;
          if(data.otherDesc)
            data.otherDesc = base64url.decode(data.otherDesc)

          me.data = data;
          me.setState({
            data: data
          })

          var action = me.state.action;
          
          if(!me.state.data.status || me.state.data.status === 'notstart'){
            action = ACTIONS.update
          } else if(me.state.data.status === 'canceled'){
            action = ACTIONS.recovery
          } else {
            action = ACTIONS.none;
          }
          me.setState({
            action: action
          })
          cb && cb(true)
        },
        error: function(err){
          cb && cb(false)
         
        }
      })
    } else {
      cb && cb(true)
    }
  }
  
  componentDidMount(){
    super.componentDidMount()
    var node = $(ReactDOM.findDOMNode(this));
    this.init(() => {
      
      // Inline date-time
      /* eslint "no-unused-vars": 0 */
      DatetimePicker.create(node.find('input[name=registStartTime]')[0], this.state.data.registStartTime, (picker, value) => {
        // console.log('registStartTime', value)
        if (value) this.data.registStartTime = value;
        else this.data.registStartTime = undefined;
      })

      DatetimePicker.create(node.find('input[name=registEndTime]')[0], this.state.data.registEndTime, (picker, value) => {
        if (value) this.data.registEndTime = value;
        else this.data.registEndTime = undefined;
      })

      DatetimePicker.create(node.find('input[name=activeStartTime]')[0], this.state.data.activeStartTime, (picker, value) => {
        if (value) this.data.activeStartTime = value;
        else this.data.activeStartTime = undefined;
      })

      DatetimePicker.create(node.find('input[name=activeEndTime]')[0], this.state.data.activeEndTime , (picker, value) => {
        if (value) this.data.activeEndTime = value;
        else this.data.activeEndTime = undefined;
      })
    })
    
  }

  handleClickDesc (e) {
    e.preventDefault()
    var res = EditorView.open({value: this.state.data.desc})
    $(res[1]).on('ok', event => {
      this.data.desc = event.detail.value;
      this.setState({
        data: this.data
      })
    })
    
  }

  handleClickOtherDesc(e){
    var uploadFileFn = (file, cb, eidtor, event) => {
      Modals.showIndicator()
      Ajax.postFormData({
        url: '/oss/uploadFile',
        data:  {
          file: file,
          name: file.name
        },
        success: function(json){
          Modals.hideIndicator()
          if(!json.error)
            cb && cb(json.data.url)
        }

      })
    }
    e.preventDefault()
    var res = RichTextEditorView.open({
      value: this.state.data.otherDesc,
      handlers: {
        image: uploadFileFn
      }
    })
    $(res[1]).on('ok', event => {
      this.setState(function(previousState, currentProps) {
        var data = previousState.data
        data.otherDesc = event.detail.value;
        // console.log(event.detail.value)
        // alert( base64url.encode(data.otherDesc).length)
        return {data: data};
      })
    })
  }

  /**
   * 活动地址选择
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  handleAtivePlaceClick(event){
    event.preventDefault()
    CitySelectView.open({
      value: this.state.data.activePlace ? {
        city: {
          name: this.state.data.activePlace.city,
          code: this.state.data.activePlace.cityCode
        },
        province: {
          name: this.state.data.activePlace.province,
          code: this.state.data.activePlace.provinceCode
        }

      } : undefined,
      onOk: (value) => {
        var place = {
          city: value.city.name,
          cityCode: value.city.code,
          province: value.province.name,
          provinceCode: value.province.code
        }
        this.data.activePlace = place;
        if(!this.data.gatherPlace || !!this.data.gatherPlace.code){
          this.data.gatherPlace =  Object.assign({}, place)
        }
        this.setState({
          data: this.data
        })
      }
    })
  }

  // handleAtivePlaceClick2(event){
  //   event.preventDefault()
  //   var res = MapView.open()
  //   // $(res[1]).on('')
  //   $(res[1]).on('select', (event) => {
  //     var poi = event.detail.value
  //     var place = {
  //       name: poi.name,
  //       address: poi.address,
  //       city: poi.city,
  //       lng: poi.location.lng,
  //       lat: poi.location.lat
  //     }
  //     this.data.activePlace = place;
  //     this.setState({
  //       data: this.data
  //     })

  //   })
  // }

  handleGatherPlaceClick(event){
    event.preventDefault()
    CitySelectView.open({
      value: this.state.data.gatherPlace ? {
        city: {
          name: this.state.data.gatherPlace.city,
          code: this.state.data.gatherPlace.cityCode
        },
        province: {
          name: this.state.data.gatherPlace.province,
          code: this.state.data.gatherPlace.provinceCode
        }

      } : undefined,
      onOk: (value) => {
        var place = {
          city: value.city.name,
          cityCode: value.city.code,
          province: value.province.name,
          provinceCode: value.province.code
        }
        this.data.gatherPlace = place;
        this.setState({
          data: this.data
        })
      }
    })
     
  }

  /*类目选择*/
  handleSelectCategory(event){
    event.preventDefault()
    var res = CategorySelectView.open({value: this.state.data.category? this.state.data.category.id : undefined})
    $(res[1]).on('select', event => {
      var cat = event.detail.value
      this.data.category = cat
      this.setState({
        data: this.data
      })
    })
  }

  scrollImageWrapper(){
    var imageWrapper = this.refs.imageWrapper;
    if(imageWrapper.scrollWidth > imageWrapper.offsetWidth){
      imageWrapper.scrollLeft = imageWrapper.scrollWidth - imageWrapper.offsetWidth
    }
  }

  handleUploadImg(event){
    var files =[].slice.call(event.target.files, 0),
        file = files[0];
    event.target.value = ''
    var url = URL.createObjectURL(file);
    var imgData = {
        name: file.name,
        file: file,
        type: 'image',
        url: url,
        uploadStatus: UPLOAD_STATUS.uploading
      } ;
    getImageSize(url).then(([width, height]) => {
      
      imgData.width = width;
      imgData.height = height;

      this.data.images.push(imgData)
      this.setState({
        data: this.data
      })
      this.scrollImageWrapper()

      
     return Ajax.postFormData({
          url: '/oss/uploadFile',
          data:  imgData
        })
      },  (err) => {
        imgData.uploadStatus = UPLOAD_STATUS.error
        delete imgData.file
        imgData.error = err.message
        this.setState({
          data: this.data
        })
      }).then( ([json]) => {
        if(!json.error){
          imgData.uploadStatus = UPLOAD_STATUS.success
          imgData.url = json.data.url
          this.setState({
            data: this.data
          })
        } else {
          imgData.uploadStatus = UPLOAD_STATUS.error
          imgData.error = json.message
          this.setState({
            data: this.data
          })
        }
      }, ([err]) => {
        imgData.uploadStatus = UPLOAD_STATUS.error
        imgData.error = err.message
        this.setState({
          data: this.data
        })
        console.error('uplaod err', err)
      }
    )
  }


  handleDeleteImageItem(index, event){
    event.preventDefault();
    var delImg = this.data.images.splice(index, 1);
    Ajax.ajax({
      url: '/oss/deleteFile',
      data: {
        url: delImg[0].url
      },
      method: 'DELETE'
       
    })
    this.setState({
      data: this.data
    })
  }

  validate(data) {

    // if(true) return true;
    
     if(!data.images || data.images.length === 0){
      Notifications.addNotification({
          title: '提示',
          message: '请上传活动图片！'
          //hold: 4000
      });
      return false
    }

    if(!data.name){
      Notifications.addNotification({
          title: '提示',
          message: '请填写活动标题！',
          hold: 4000
      });
      return false
    }

    if(!data.desc){
      Notifications.addNotification({
          title: '提示',
          message: '请填写活动描述！',
          hold: 4000
      });
      return false
    }

    if(!data.category){
      Notifications.addNotification({
          title: '提示',
          message: '选择活动类目！',
          hold: 4000
      });
      return false
    }

    if(data.activeStartTime && data.activeEndTime && data.activeStartTime.getTime() >= data.activeEndTime.getTime()){
      // console.log(data.activeStartTime , data.activeEndTime)
       Notifications.addNotification({
          title: '提示',
          message: '活动结束时间要在活动开始时间之后！',
          hold: 4000
      });
      return false;
    }

    if(!!data.registStartTime ^ !!data.registEndTime){
      Notifications.addNotification({
          title: '提示',
          message: '请填写完整的报名开始结束时间！',
          hold: 4000
      });
      return false;
    }

    if(data.registStartTime && data.registEndTime && data.registStartTime.getTime() >= data.registEndTime.getTime()){
       Notifications.addNotification({
          title: '提示',
          message: '报名结束时间要在报名开始时间之后！',
          hold: 4000
      });
      return false;
    }

     if(!data.activeStartTime || !data.activeEndTime){
      Notifications.addNotification({
          title: '提示',
          message: '请填写活动开始结束时间！',
          hold: 4000
      });
      return false;
    }

    

    var now = new Date()
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(),  now.getHours());
    if(data.registStartTime && data.registStartTime.getTime() < now.getTime() ){
       Notifications.addNotification({
          title: '提示',
          message: '报名开始时间要在当前时间之后！',
          hold: 4000
      });
      return false;
    }

    if(data.activeStartTime && data.activeStartTime.getTime() < now.getTime() ){
       Notifications.addNotification({
          title: '提示',
          message: '活动开始时间要在当前时间之后！',
          hold: 4000
      });
      return false;
    }

    if(!data.activePlace){
      Notifications.addNotification({
          title: '提示',
          message: '请填写活动地点！',
          hold: 4000
      });
      return false
    }

    if(!data.activePlace.city){
      Notifications.addNotification({
          title: '提示',
          message: '请选择活动城市！',
          hold: 4000
      });
      return false
    }

    if(!data.activePlace.address){
      Notifications.addNotification({
          title: '提示',
          message: '请填写活动详细地址！',
          hold: 4000
      });
      return false
    }

    if(!data.mobile){
      Notifications.addNotification({
          title: '提示',
          message: '请填写联系电话！',
          hold: 4000
      });
      return false
    }


    return true;
  }

  handlePublish(event){
    event.preventDefault();
    if( !this.state.action ){
      return;
    }

    let data = Object.assign({}, this.state.data)
    if(! this.validate(data)){
      return;
    }

    if(this.state.action === ACTIONS.recovery){
      data.canceled = false;
    }

    var newimages = []
    data.images.forEach(img => {
      newimages.push(img.url);
    })
    data.images = newimages;
    data.community = {
      id: Auth.getCommunityId()
    }
    if(data.otherDesc) data.otherDesc = base64url.encode(data.otherDesc)
    var url = 'product/create',
        method = 'POST'

    if(this.props.params.id){
      url = 'product/update'
      method = 'PUT'
    }

// console.log('publish', data)
    Ajax.ajax({
      method: method,
      contentType: 'applicaton/json',
      url: url,
      data: JSON.stringify(data)
    }).then(function([json]){
      // console.log('json', json)
      if(!json.error){
        history.push('/products')
      }
       
    })
    
  }

  render(){
    return (
      <div className={classNames('page pub-product-page toolbar-through', this.props.className)}>
        
        <div className="page-content">
          <div className="image-container">
            <div className="image-wrapper" ref="imageWrapper">
              {
                this.state.data.images.map((img, index) => (
                  <div className="image-item" key={'image-'+index}>
                    <img src={img.url} width={img.width > img.height ? 'auto' : '100%'} height={img.width > img.height ? '100%' : 'auto'}/>
                    {img.uploadStatus === UPLOAD_STATUS.uploading ?
                      (
                      <div className="preloader-indicator-overlay modal-overlay-visible">
                        <div className="preloader-indicator-modal"><span className="preloader preloader-white"></span></div>
                      </div>
                      ) : ''
                    }

                    {img.uploadStatus === UPLOAD_STATUS.error ?
                      (
                      <div className="preloader-indicator-overlay modal-overlay-visible">
                        <div className="preloader-indicator-modal">
                        <span className="upload-error-indicator">{img.error}</span>
                        </div>
                      </div>
                      ) : ''
                    }
                   <a  onClick={this.handleDeleteImageItem.bind(this, index)} className="btn-delete-image-item"></a>
                  </div>
                ))
              }
              <div className="image-item add-image-item">
            {/*accept="video/*, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/mp4, video/quicktime, video/mpeg, video/ogv, image/*" */}
                <input type="file" name="file" accept="image/*" onChange={this.handleUploadImg.bind(this)}/>
              </div>
            </div>
          </div>
          <List>
            <div className="item-content">
              <div className="item-inner">
               <div className="item-title" style={{marginRight: '10px'}}><i className="required-flag"></i></div>
                <div className="item-input">
                  <input type="text" value={this.state.data.name} onChange={this.handleNameChange.bind(this)} placeholder="输入活动标题" />
                </div>
              </div>
            </div>
            <a onClick={this.handleClickDesc.bind(this)} className="item-link item-content">
              <div className="item-inner">
                <div className="item-title">描述<i className="required-flag"></i></div>
                <div className="item-after">{this.state.data.desc ? '已编辑' : ''}</div>
              </div>
            </a>
            <div className="item-content item-icon-right">
              <div className="item-inner">
                <div className="item-title label" >价格</div>
                <div className="item-input">
                  <input type="number" value={this.state.data.price || ''} onBlur={this.handlePriceBlur.bind(this)} onChange={this.handlePriceChange.bind(this)} placeholder="免费" />
                </div>
                <i className="icon">¥</i>
              </div>
            </div>

            <div className="item-content item-icon-right">
              <div className="item-inner">
                <div className="item-title label" >限制人数</div>
                <div className="item-input">
                  <input type="number" value={this.state.data.limit || ''} onChange={this.handleLimitChange.bind(this)} placeholder="不限" />
                </div>
                <i className="icon">人</i>
              </div>
            </div>

            <a onClick={this.handleSelectCategory.bind(this)}  className="item-link item-content">
              <div className="item-inner">
                <div className="item-title">类目<i className="required-flag"></i></div>
                 <div className="item-after">{(this.state.data.category && this.state.data.category.name) ? this.state.data.category.name : ''}</div>
              </div>
            </a>
          </List>

          <List>
             
            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label">报名开始时间</div>
                <div className="item-input">
                  <input type="text" placeholder="不限"  name="registStartTime" />
                </div>
              </div>
            </div>

            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label">报名结束时间</div>
                <div className="item-input">
                  <input type="text" placeholder="不限" name="registEndTime" />
                </div>
              </div>
            </div>

            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label">活动开始时间<i className="required-flag"></i></div>
                <div className="item-input">
                  <input type="text" placeholder="不限"    name="activeStartTime" />
                </div>
              </div>
            </div>

            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label">活动结束时间<i className="required-flag"></i></div>
                <div className="item-input">
                  <input type="text" placeholder="不限"    name="activeEndTime" />
                </div>
              </div>
            </div>

            <a className="item-content item-link" onClick={this.handleAtivePlaceClick.bind(this)}>
              <div className="item-inner">
                <div className="item-title label">活动地点<i className="required-flag"></i></div>
                <div className="item-after">
                   {(this.state.data.activePlace && this.state.data.activePlace.city) ? this.state.data.activePlace.city : '请选择城市'}
                </div>
              </div>
            </a>

            <li className="align-top">
              <div className="item-content item-address">
                <div className="item-inner">
                  <div className="item-title label"></div>
                  <div className="item-input">
                    <ResizableTextarea placeholder="详细地址（如门牌号等）" value={(this.state.data.activePlace && this.state.data.activePlace.address) ? this.state.data.activePlace.address : ''} onChange={this.handleActivePlaceAddressChnage.bind(this)}></ResizableTextarea>
                  </div>
                </div>
              </div>
            </li>

            <a className="item-content item-link" onClick={this.handleGatherPlaceClick.bind(this)}>
              <div className="item-inner">
                <div className="item-title">集合地点</div>
                <div className="item-after">
                   {this.state.data.gatherPlace && this.state.data.gatherPlace.city ? this.state.data.gatherPlace.city : '请选择城市' }
                </div>
              </div>
            </a>

            <li className="align-top">
              <div className="item-content item-address">
                <div className="item-inner">
                  <div className="item-title label"></div>
                  <div className="item-input">
                    <ResizableTextarea placeholder="详细地址（如门牌号等）" value={(this.state.data.gatherPlace && this.state.data.gatherPlace.address) ? this.state.data.gatherPlace.address : ''} onChange={this.handleGatherPlaceAddressChnage.bind(this)}></ResizableTextarea>
                  </div>
                </div>
              </div>
            </li>

           

          </List>

          <List>
            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label" style={{width: '60px'}}>手机号<i className="required-flag"></i></div>
                <div className="item-input" style={{marginLeft: '0'}}>
                  <input type="tel" placeholder="手机号" name="mobile" value={this.state.data.mobile || ''} onChange={this.handleMobileChange.bind(this)}/>
                </div>
              </div>
            </div>

            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label" style={{width: '60px'}}>QQ</div>
                <div className="item-input" style={{marginLeft: '0'}}>
                  <input type="text" name="qq" placeholder="QQ" value={this.state.data.qq || ''} onChange={this.handleQQChange.bind(this)}/>
                </div>
              </div>
            </div>
          </List>

          <List>
             <a className="item-content item-link" onClick={this.handleClickOtherDesc.bind(this)}>
              <div className="item-inner">
                <div className="item-title">其它说明</div>
                <div className="item-after">{this.state.data.otherDesc ? '已编辑' : ''}</div>
                 
              </div>
            </a>
          </List>
        </div>

        <div className="toolbar">
          <div className="toolbar-inner full-button-toolbar-inner ">
            <a className={classNames('button button-fill', {'disabled': !this.state.action})}  style={{width: '100%'}} onClick={this.handlePublish.bind(this)}>
            {this.state.action===ACTIONS.recovery ? '恢复': this.state.action===ACTIONS.update ? '完成':'发布'}
            </a>
          </div>
        </div>
      </div>
    )
  }

  handleNameChange(event) {
    this.data.name = event.target.value;
    this.setState({
      data: this.data
    })
  }

  handlePriceChange(event){
    this.data.price = event.target.value;
    this.setState({
      data: this.data
    })
  }

  handlePriceBlur(event){
    var value = event.target.value;
    if(value !=='' && value !== undefined){
      this.data.price = Number(value)
      this.setState({
        data: this.data
      })
    }
  }

  handleLimitChange(event){
    var value = event.target.value;
    if(value !=='' && value!== undefined){
      this.data.limit = Number(value);
    } else {
      this.data.limit = undefined;
    }
    
    this.setState({
      data: this.data
    })
  }


  handleMobileChange(event){
    this.data.mobile = event.target.value;
    this.setState({
      data: this.data
    })
  }

  handleQQChange(event) {
    this.data.qq = event.target.value;
    this.setState({
      data: this.data
    })
  }


  handleActivePlaceAddressChnage(event){
    this.data.activePlace.address = event.target.value;
    this.setState({data: this.data});
  }

  handleGatherPlaceAddressChnage(event){
    this.data.gatherPlace.address = event.target.value;
    this.setState({data: this.data});
  }

  // handleChangeRegistStartTime(event){
  //   this.data.registStartTime = moment(event.target.value).toDate()
  //   this.setState({data: this.data});
  // }
  //  handleChangeRegistEndTime(event){
  //   this.data.registEndTime = moment(event.target.value).toDate()
  //   this.setState({data: this.data});
  // }
  //  handleChangeActiveStartTime(event){
  //    console.log('handleChangeActiveStartTime', event.target.value)
  //   this.data.activeStartTime = moment(event.target.value).toDate()
  //   console.log('', this.data.activeStartTime)
  //   this.setState({data: this.data});
  // }
  //  handleChangeActiveEndTime(event){
  //   console.log('handleChangeActiveEndTime', event.target.value)
  //   this.data.activeEndTime = moment(event.target.value).toDate()
  //   console.log('', this.data.activeEndTime)
  //   this.setState({data: this.data});
  // }
  
}

module.exports = PubProductPage
