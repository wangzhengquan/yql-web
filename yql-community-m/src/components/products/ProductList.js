import React  from 'react';
import { Link } from 'react-router'
import Ajax from '../../ajax'
import Auth from '../../services/Auth'
import classnames from 'classnames'
import CONFIG from '../../config'
import LazyLoad from 'react-ui/lazy-load'
require('../../resources/less/products-manage-list.less')

class ProductList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    	 
      
    }
  }

  componentWillUnmount() {
  }

  componentDidMount(){
    var  me = this;
    Ajax.ajax({
      method: 'GET',
      url: 'products',
      data: {
        community: Auth.getCommunityId(),
        status: me.props.status
      },
      success:  (json) => {
        var data = json.data
        me.setState({
          data: data
        }, ()=> {
          this.lazyLoad = new LazyLoad({
            scrollContainer: '.page-content'
          })
        })
      } 
    })
  }
   
  cancel(item, e){
    e.preventDefault()
    var me = this;
    if(item.status && item.status !== 'notstart'){
      return;
    }
    Ajax.ajax({
      method: 'PUT',
      url: 'product/cancel',
      data: {
        id: item.id
      },
      success:  (json) => {
        
        if(!json.error){
          item.status = 'canceled'
          item.canceled = true
          me.setState({
            data: me.state.data
          })
        }
      } 
    })
  }

  preview(productId, e){
    e.preventDefault()
    window.open(CONFIG.USER_HOST+'/product/'+productId+'?token='+encodeURIComponent(Auth.getToken()) )
  }
  

  render(){
    return (
     <div className="list-block media-list product-manage-list">
       <ul>
        {
          this.state.data? this.state.data.map((item, index) => (
            <li key={item.id}>
             <a onClick={this.preview.bind(this, item.id)}  className="product-item-content item-link item-content">
               <div className="item-media"><div className="image-wrapper"><img src={item.images[0]} className="lazy"/></div></div>
               <div className="item-inner">
                 <div className="item-title-row">
                   <div className="item-title">{item.name}</div>
                   <div className="item-after" style={{color: '#ff3b30'}}>{item.statusName || ''}</div>
                 </div>
                 <div className="item-subtitle" style={{color: '#ff3b30'}}>{item.price===0? '免费': '¥'+item.price} </div>
                 <div className="item-text">{item.desc}</div>
               </div>
             </a>

             <div className="product-toolbar toolbar tabbar tabbar-labels ">
               <div className="product-toolbar-inner toolbar-inner tabbar tabbar-labels">
                 <Link to={item.status==='canceled' ? 'recover-product/'+item.id : '/edit-product/'+item.id} className="tab-link">
                   <i className="iconfont icon-edit"></i>
                   <span className="tabbar-label">{item.status==='canceled' ? '恢复活动':'编辑'}</span>
                 </Link>

                 <a onClick={this.preview.bind(this, item.id)} className="tab-link">
                   <i className="iconfont icon-preview"></i>
                   <span className="tabbar-label">预览</span>
                 </a>

                 <Link to={'/'+item.id+'/orders'} className="tab-link">
                   <i className="iconfont icon-collection"></i>
                   <span className="tabbar-label">报名情况</span>
                 </Link>

                 <a onClick={this.cancel.bind(this, item)} className={classnames('tab-link', {'disabled': item.status && item.status !== 'notstart'})}>
                   <i className="iconfont icon-delete"></i>
                   <span className="tabbar-label" >取消活动</span>
                 </a>
               </div>
             </div>
            </li>
          )) : ''
        }
       </ul>
     </div>      
    );
  }
  
}


export default ProductList