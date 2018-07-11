import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import { Link } from 'react-router'
import Ajax from '../../ajax'
import Auth from '../../services/Auth'
require('../../resources/less/orders-page.less')

class OrdersPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  
   
  componentDidMount(){
    Ajax.ajax({
      method: 'GET',
      url: 'orders',
      data: {
        userId: Auth.getUserId()
      },
      success:  (json) => {
        this.setState({
          data: json.data
        })
        // console.log('OrdersPage', this, json)
      }
    })
  }
  
  render(){
    return (
    <div className={classnames('page orders-page', this.props.className)}>
      <div className="page-content">
        <div className="list-block media-list order-list">
         <ul>
          {
            this.state.data ? this.state.data.map((item) => {
              let product = item.product;
              return (
              <li key={item.id}>
                {/*
                <Link to={'community/'+product.community.id} className="item-content item-link item-community">
                  <div className="item-community-inner">
                    <div className="item-media"><img src={product.community.logo} width="30" height="30"/></div>
                    <div className="item-title">{product.community.name}</div>
                  </div>
                </Link>
                */}
                <Link to={'/order/'+item.id } className="item-product item-link item-content">
                 <div className="item-media"><img src={product.images[0]} width="80" height="80"/></div>
                 <div className="item-inner">
                   <div className="item-title-row">
                     <div className="item-title">{product.name}</div>
                      {/*<div className="item-after" style={{color: '#ff3b30'}}>{product.statusName || ''} </div>*/}
                   </div>
                   <div className="item-subtitle" style={{color: '#ff3b30'}}>{product.price===0? '免费': '¥'+product.price}</div>
                   <div className="item-text">{product.desc}</div>
                 </div>
                </Link>
               {
                /*
                <div className="product-toolbar toolbar tabbar tabbar-labels ">
                 <div className="product-toolbar-inner toolbar-inner tabbar tabbar-labels">
                   <Link to={item.status==='canceled' ? 'recover-product/'+product.id : '/edit-product/'+product.id} className="tab-link">
                     <i className="iconfont icon-edit"></i>
                     <span className="tabbar-label">{product.status==='canceled' ? '恢复活动':'编辑'}</span>
                   </Link>

                   <a href="#" className="tab-link">
                     <i className="iconfont icon-preview"></i>
                     <span className="tabbar-label">预览</span>
                   </a>

                   <a href="#" className="tab-link">
                     <i className="iconfont icon-collection"></i>
                     <span className="tabbar-label">报名情况</span>
                   </a>

                   <a onClick={this.cancel.bind(this, item)} className={classnames('tab-link', {'disabled': item.status && item.status !== 'notstart'})}>
                     <i className="iconfont icon-delete"></i>
                     <span className="tabbar-label" >取消活动</span>
                   </a>
                 </div>
               </div>
                 */
               }
               

              </li>
            )}) : ''
          }
         </ul>
       </div>  
      </div>
    </div>
    )
  }
}

module.exports = OrdersPage

