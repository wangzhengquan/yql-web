import React  from 'react'
import Page from '../Page'
import classNames from 'classnames'
import Slider from '../widget/Slider'
import $ from 'react-ui/dom'
import ReactUI from 'react-ui/react-ui'
import Ajax from '../../ajax'
import ActionSheet from 'react-ui/action-sheet'
import DecorationTypeSelecter from './DecorationTypeSelecter'
import TextEditorView from 'react-ui/widget/textarea-editor'
import BannerEditorView from './BannerEditorView'
import HeaderBannerEditorView from './HeaderBannerEditorView'
import Auth from '../../services/Auth'
import SliderEditorView from './SliderEditorView'
import MessageBox from 'react-ui/message-box'

require('../../resources/less/decorate-page.less')

class DecoratePage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
    this.init()

  }

  init(){
    Ajax.ajax({
      method:'GET',
      url: 'community-decorations/'+Auth.getCommunityId(),
      success: (json) => {
        var data = json.data;
        if(!data.community.headBanner){
          data.community.headBanner = require('../../resources/img/community-head-banner.jpg')
        }
        this.setState({
          data: json.data
        })
      }
    })
  }

  // initTest(){
  //   var data = this.state.data || [];
    

  //   data.push({
  //     key: ReactUI.guid(),
  //     type: 'slider',
  //     content: '',
  //     contentEntity: [{
  //       url: 'http://192.168.0.100:8080/yql/resources/img/一起来20160716172806781.jpg'
  //     }, {
  //       url: 'http://192.168.0.100:8080/yql/resources/img/一起来20160716172806781.jpg'
  //     }]
  //   })

  //   data.push({
  //     key: ReactUI.guid(),
  //     type: 'slider',
  //     content: '',
  //     contentEntity: [{
  //       url: 'http://hlj-img.b0.upaiyun.com/zmw/upload/20160612/ce27a776d04843fb81aa7587c73e2e53.jpg'
  //     }, {
  //       url: 'http://hlj-img.b0.upaiyun.com/zmw/upload/20160612/ce27a776d04843fb81aa7587c73e2e53.jpg'
  //     }]
  //   })

  //   data.push({
  //     key: ReactUI.guid(),
  //     type: 'banner',
  //     content: '',
  //     contentEntity: [{
  //       url: 'http://hlj-img.b0.upaiyun.com/zmw/upload/20160612/ce27a776d04843fb81aa7587c73e2e53.jpg'
  //     }]
  //   })

  //   data.push({
  //     key: ReactUI.guid(),
  //     type: 'text',
  //     content: 'sdfdsjfkj上看到房价快速的减肥开始减肥山东警方跨世纪的反馈就是看到饭就开始觉得分开就是对方收到反馈时间的反馈就是对方'
       
  //   })
  //   this.setState({
  //     data: data
  //   })
  // }
   
  // componentDidMount() {
  // }

  deleteDecoration(index){
    MessageBox.confirm('确实删除该组件吗？', '', () => {
      var decorations = this.state.data.decorations;
      decorations.splice(index, 1);
      this.setState({
        data: this.state.data
      })
    })
  }
  insertNewDecoration(index) {
    var me = this;
    let res = DecorationTypeSelecter.open()
    $(res[1]).on('select', event => {
      var type = event.detail.value;
      if(type === 'text') {
        let res = TextEditorView.open()
        $(res[1]).on('ok', (event) => {
          var value = event.detail.value
          var decorations = this.state.data.decorations;
          decorations.splice(index+1, 0, {
            key: ReactUI.guid(),
            type: 'text',
            content: value
             
          })
          this.setState({
            data: this.state.data
          })
          window.mainView.router.back({
              force: true,
              pageName: me.props.pageName
          });
        })
      } else if(type === 'banner') {
        let res = BannerEditorView.open()
        $(res[1]).on('ok', (event) => {
          var value = event.detail.value
          var decorations = this.state.data.decorations;
          decorations.splice(index+1, 0, {
            key: ReactUI.guid(),
            type: 'banner',
            contentEntity: [{
              url: value.url,
              link: value.link
            }]
             
          })
          this.setState({
            data: this.state.data
          })
          window.mainView.router.back({
              force: true,
              pageName: me.props.pageName
          });
        })
      } else if(type === 'slider') {
        let res = SliderEditorView.open()
        $(res[1]).on('ok', (event) => {
          var value = event.detail.value
          var decorations = this.state.data.decorations;
          decorations.splice(index+1, 0, {
            key: ReactUI.guid(),
            type: 'slider',
            contentEntity: value
          })
          
          this.setState({
            data: this.state.data
          })
          window.mainView.router.back({
              force: true,
              pageName: me.props.pageName
          });
        })
      }

    })
  }

  updaeDecoration(index){
    var item = this.state.data[index];
    if(item.type === 'text'){
      let res = TextEditorView.open({
        value: item.content
      })
      $(res[1]).on('ok', (event) => {
        var value = event.detail.value
        var data = this.state.data;

        item.content = value;
         
        this.setState({
          data: data
        })
        
      })
    } else if(item.type === 'banner') {
      let res = BannerEditorView.open({
        value: item.contentEntity[0]
      })
      $(res[1]).on('ok', (event) => {
        var value = event.detail.value
        var data = this.state.data;
        item.contentEntity = [{
          url: value.url,
          link: value.link
        }]
         
        this.setState({
          data: data
        })
         
      })
    } else if(item.type === 'slider') {
      let res = SliderEditorView.open({
        value: item.contentEntity
      })
      $(res[1]).on('ok', (event) => {
        var value = event.detail.value
        var data = this.state.data;
        item.contentEntity = value
        this.setState({
          data: data
        })
         
      })
    }  
  }

  openHeadBannerEditor(){
    let res = HeaderBannerEditorView.open({
      value: {url: this.state.data.community.headBanner}
    })
    $(res[1]).on('ok', (event) => {
      var value = event.detail.value
      var community = this.state.data.community || {};
      community.headBanner = value.url;
      Auth.setCommunity(community)
      this.setState({
        data: this.state.data
      })
       
    })

  }

  openHeadBannerDecorateActionSheet(event){
    event.preventDefault()
    var actionSheetButtons = [
      // First buttons group
      [
          {
              text: '插入新组件',
              onClick:  () => {
                  this.insertNewDecoration(0)
              }
          },
          {
              text: '编辑',
              onClick:  () => {
                  this.openHeadBannerEditor(0)
              }
          }
           
      ],
      // Second group
      [
          {
              text: '取消',
              bold: true
          }
      ]
    ];

    ActionSheet.open(actionSheetButtons)
  }

  openDecorateActionSheet(index, event) {
    event.preventDefault()
    var actionSheetButtons = [
        // First buttons group
        [
            // Group Label
            // {
            //     text: 'Here comes some optional description or warning for actions below',
            //     label: true
            // },
            // First button
            {
                text: '插入新组件',
                onClick:  () => {
                    this.insertNewDecoration(index)
                }
            },
            {
                text: '编辑',
                onClick:  () => {
                    this.updaeDecoration(index)
                }
            },
            //Another red button
            
            {
                text: '删除',
                color: 'red',
                onClick:  () => {
                  this.deleteDecoration(index)
                }
            } 
        ],
        // Second group
        [
            {
                text: '取消',
                bold: true
            }
        ]
    ];

    ActionSheet.open(actionSheetButtons)
  }

  /**
   * 
   * 发布
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  publish(e){
    e.preventDefault()
    var data = this.state.data;

    Ajax.ajax({
      method: 'POST',
      contentType: 'applicaton/json',
      url: 'decorations/decorate',
      data: JSON.stringify(data)
    }).then(function([json]){
      if(!json.error){
        MessageBox.alert('成功应用到社团');
      }
    }, function(err){
      console.error('err', err)
    })
  }
   

  render(){
    return (
      <div className={classNames('page decorate-page toolbar-through', this.props.className)} data-page={this.props.pageName}>
        <div className="page-content">
          <div className="decorate-wall">
            <div className="component headerBanner">
              <div className="image-wrapper">
                 <img width="100%" src={this.state.data && this.state.data.community ? this.state.data.community.headBanner : ''}/>
              </div>
              <div className="modal-overlay preloader-indicator-overlay"></div>
              <a className="decorate-button" onClick={this.openHeadBannerDecorateActionSheet.bind(this)}>点我装修</a>
            </div>
          {
            this.state.data && this.state.data.decorations ? this.state.data.decorations.map((item, index) => {
              if(item.type === 'slider'){
                return ( 
                  <Slider className="component" data={item.contentEntity} key={item.id || item.key} params={{pagination:'.swiper-pagination',  loop: false}}>
                  <a className="decorate-button" onClick={this.openDecorateActionSheet.bind(this, index)}>点我装修</a>
                  </Slider>
                  )
              } else if(item.type === 'banner'){
                return ( 
                <div className="banner component" key={item.id || item.key}>
                  <img src={item.contentEntity && item.contentEntity.length> 0? item.contentEntity[0].url: ''} style={{width: '100%'}}/>
                  <a className="decorate-button" onClick={this.openDecorateActionSheet.bind(this, index)}>点我装修</a>
                </div>
                )
              } else if(item.type === 'text'){
                return ( 
                <p className="text component" key={item.id || item.key}>
                  {item.content}
                  <a className="decorate-button" onClick={this.openDecorateActionSheet.bind(this, index)}>点我装修</a>
                </p>
                )
              } 
            }) : ''
          }
           
          </div>
        </div>
        <div className="toolbar">
          <div className="toolbar-inner full-button-toolbar-inner" >
            <a className="button button-fill bg-green button-enter" style={{width: '100%'}} onClick={this.publish.bind(this)}>应用到社团</a>
          </div>
        </div>
      </div>
    );
  }
  
}

module.exports = DecoratePage
