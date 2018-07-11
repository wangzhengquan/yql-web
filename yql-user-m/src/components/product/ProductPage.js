import React  from 'react';
import {Link} from 'react-router'
import Slider from '../widget/Slider'
import Page from '../Page'
import Ajax from '../../ajax'
import classNames from 'classnames'
import List from 'react-ui/lists'
// import Auth from '../../services/Auth'
import  history from '../../history'
// import MeInfoEditor from './MeInfoEditor'
import DateUitl from 'react-ui/date'
import ProductStatus from '../../constants/ProductStatus'
import base64url from 'base64url'
import LazyLoad from 'react-ui/lazy-load'
import Loading from 'react-ui/widget/loading'
require('../../resources/less/product-page.less')
require('react-ui/resources/less/forms.less')

class ProductPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      canRegist: false
    }

  }
  componentWillUnmount(){
     
  }
  componentDidMount(){
    super.componentDidMount()
    var productId = this.props.params.id
    Ajax.ajax({
      url: 'product/'+productId,
      method: 'GET',
      success: (json) => {

        this.setState({
          data: json.data,
          canRegist: ProductStatus.canRegist(json.data.status)
        })
        if(json.data.otherDesc) this.refs.otherDesc.innerHTML = base64url.decode(json.data.otherDesc)
        new LazyLoad({
          scrollContainer: this.refs.pageContent
        })
      } 
    })

  }

  // validate(){
  //   var me = this
  //   var user = Auth.getUser()
  //   if(!user){
  //     window.sessionStorage.setItem('nextPath', '/order-confirm?productId='+this.props.params.id)
  //     history.push('/login')
  //     return false;
  //   }
  //   var orderDate = {
  //       userId: Auth.getUser().id,
  //       productId: this.props.params.id
  //   }
  //   if(!user.realname || !user.birthday || !user.sex){
  //      MeInfoEditor.open({
  //       data: user,
  //       onOk: (data) =>{
  //         // console.log('==ok ===', data)
  //         user = data;
  //         user.birthday = new Date(...user.birthday.split('-'))
  //         orderDate.user = JSON.stringify(user)
  //         me.apply(orderDate);
           
  //       }
  //     })
  //     return false;
  //   }

  //   return true;
   
  // }

  apply(){
    
    history.push('/order-confirm?productId='+this.props.params.id)
  }

  handleApply(e){
    e.preventDefault();
    if(!this.state.canRegist){
      return
    }
    this.apply()
    // history.push('/order-confirm?productId='+this.props.params.id)
     
  }

  render(){
    let pdata = this.state.data;
    var content = (<div className="page-content" ref="pageContent" ><Loading/></div>)
    if(pdata){
      content = [
      <div className="page-content" ref="pageContent" key="pageContent">
        <section className="section section-product">  
          <Slider data={pdata.banners} />
          <div className="title">
            {pdata.name}
          </div>

          <div className="block item-status">
            
            <span className="price">{pdata.price === 0 ? '免费' : '￥'+pdata.price}</span>
            <span className="status fr">{ProductStatus.getStatusLabel(pdata.status)}</span>
          </div>

          <div className="desc">
            <p> 
            {pdata.desc}
            </p>
          </div>
        </section>
        <section className="section">
          <div className="list-block">
            <ul>
            {
              this.state.data.registStartTime ?
              <li>
                <a href="#" className="item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">报名开始时间</div>
                    <div className="item-after">{DateUitl.format(new Date(pdata.registStartTime), 'yyyy-MM-dd hh:mm')}</div>
                  </div>
                </a>
              </li>: ''
            }
              
            {
              this.state.data.registEndTime ?
              <li>
                <a href="#" className="item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">报名截止时间</div>
                    <div className="item-after">{DateUitl.format(new Date(pdata.registEndTime), 'yyyy-MM-dd hh:mm')}</div>
                  </div>
                </a>
              </li> : ''
            }
            {
              this.state.data.activeStartTime ?
              <li>
                <div className="item-content">
                  <div className="item-inner"> 
                    <div className="item-title">活动开始时间</div>
                    <div className="item-after">{DateUitl.format(new Date(pdata.activeStartTime), 'yyyy-MM-dd hh:mm')}</div>
                  </div>
                </div>
              </li> : ''
            }
            
            {
              this.state.data.activeEndTime ? 
              <li>
                <div className="item-content">
                  <div className="item-inner"> 
                    <div className="item-title">活动结束时间</div>
                    <div className="item-after">{DateUitl.format(new Date(pdata.activeEndTime), 'yyyy-MM-dd hh:mm')}</div>
                  </div>
                </div>
              </li> : ''
            }
              
            {
              this.state.data.gatherPlace &&  this.state.data.gatherPlace.address?
              <li>
                <div className="item-content">
                  <div className="item-inner"> 
                    <div className="item-title label">集合地点</div>
                    <div style={{textAlign: 'justify', color: '#8e8e93'}}>{this.state.data.gatherPlace.address}</div>
                  </div>
                </div>
              </li> : ''
            }

            {
              this.state.data.activePlace && this.state.data.activePlace.address ?
               <li>
                <div className="item-content">
                  <div className="item-inner"> 
                    <div className="item-title label">活动地点</div>
                    <div style={{textAlign: 'justify', color: '#8e8e93'}}>{this.state.data.activePlace.address}</div>
                  </div>
                </div>
              </li> : ''
            }
             
              
            </ul>
          </div>
         </section>

         <section className="section">
           <List className="media-list">
            <Link to={'/community/'+pdata.community.id} className="item-link item-content">
              <div className="item-media"><img src={pdata.community.logo}  width="60" height="60"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">{pdata.community && pdata.community.name}</div>
                </div>
                <div className="item-subtitle">手机: {pdata.mobile}</div>
                
              </div>
            </Link>
           </List>
         </section>
         {
          pdata.otherDesc ?
          <section className="section">
           <List className="media-list">
                <div className="item-content">
                  <div className="item-inner"> 其它说明</div>
                </div>
                <div style={{padding: '15px'}} className="rich-editor" ref="otherDesc">
                
                </div>
           </List>
         </section> : ''
         }
         
      </div>,

      <div className="toolbar" key="toolbar">
        <div className="toolbar-inner">
           <a onClick={this.handleApply.bind(this)} className={classNames('button button-fill bg-green button-enter', {'disabled': !this.state.canRegist})}>我要报名</a>
        </div>
      </div>

      ]
    }
    return (
      <div className={classNames('page product-page toolbar-through', this.props.className)} ref="page" >
          {content}
      </div>

    );
  }
  
}

module.exports = ProductPage
