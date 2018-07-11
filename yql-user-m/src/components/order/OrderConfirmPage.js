import React  from 'react';
import {Link} from 'react-router'
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import Auth from '../../services/Auth'
import Ajax from '../../ajax'
import DateUtil from 'react-ui/date'
import history from '../../history'
require('react-ui/resources/less/forms.less')
require('../../resources/less/lists.less')

class OrderConfirmPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {
      data: {
        applicant: Auth.getUser()

      }
    }
    this.init()
  }
  init(){

    Ajax.ajax({
      url: '/product/'+this.props.location.query.productId,
      method: 'GET',
      success: (json) => {
        var data = this.state.data
        data.product = json.data
        this.setState({
          data: data
        })
      }
    })
  }
   
  

  handleSubmit(e){
    e.preventDefault()
    if(this.state.disabled) return;
    this.setState({
      disabled: true
    })
    Ajax.ajax({
      url: 'order/create',
      method: 'post',
      data: {
        userId: this.state.data.applicant.id,
        productId: this.state.data.product.id
      },
      success: (json) => {
        // console.log('order/create', json)
        if(!json.error) {
          history.push('/orders')
          return;
        }
        this.setState({
          disabled: false
        })
      }
    })
  }
  
  render(){
  	return (
  	<div className={classnames( 'page toolbar-through', this.props.className)}>
	    <div className="page-content">
	      <List>
          <div className="item-content">
            <div className="item-inner">
              <div className="item-title">报名人：{this.state.data.applicant.realname}</div>
              <div className="item-after">{this.state.data.applicant.mobile}</div>
            </div>
          </div>
        </List> 
        {
          
            this.state.data.product ? 
            <List>
              <Link to={'product/'+this.state.data.product.id } className="item-product item-link item-content">
               
               <div className="item-inner has-item-media">
                 <div className="item-media"><img src={this.state.data.product.images[0]} width="80" height="80"/></div>
                 <div className="item-right">
                   <div className="item-title-row">
                     <div className="item-title">{this.state.data.product.name}</div>
                      {/*<div className="item-after" style={{color: '#ff3b30'}}>{this.state.data..statusName || ''} </div>*/}
                   </div>
                   <div className="item-subtitle" style={{color: '#ff3b30'}}>{this.state.data.product.price===0? '免费': '¥'+this.state.data.product.price}</div>
                   <div className="item-text">{this.state.data.product.desc}</div>
                 </div>
               </div>
              </Link>

               <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">活动开始时间</div>
                  <div className="item-after">{this.state.data.product ? DateUtil.format(new Date(this.state.data.product.activeStartTime), 'yyyy-MM-dd hh:mm'): ''} </div>
                </div>
              </div>

              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">活动结束时间</div>
                  <div className="item-after"> {this.state.data.product ? DateUtil.format(new Date(this.state.data.product.activeEndTime), 'yyyy-MM-dd hh:mm'): ''} </div>
                </div>
              </div>
              {
                this.state.data.product && this.state.data.product.gatherPlace && this.state.data.product.gatherPlace.address? 
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title label">集合地点</div>
                    <div style={{textAlign: 'justify', color: '#8e8e93'}}> {this.state.data.product.gatherPlace.city+ ' ' +this.state.data.product.gatherPlace.address }  </div>
                  </div>
                </div> : ''
              }
             

              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title label">活动地点</div>
                  <div style={{textAlign: 'justify', color: '#8e8e93'}}> {this.state.data.product? this.state.data.product.activePlace.city+ ' ' +this.state.data.product.activePlace.address : ''} </div>
                </div>
              </div>

            </List> : ''
          
        }
         
	    </div>

      <div className="toolbar">
        <div className="toolbar-inner single-button-toolbar-inner">
          <a className="button button-fill" onClick={this.handleSubmit.bind(this)} disabled={this.state.disabled}>提交</a>
        </div>
      </div>
	  </div>
  	)
  }
}

module.exports = OrderConfirmPage
