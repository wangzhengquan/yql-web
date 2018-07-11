import React  from 'react';
import {Link} from 'react-router'
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import Ajax from '../../ajax'
require('react-ui/resources/less/content-block.less')
require('../../resources/less/orders-page.less')

class OrdersPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {
      data: undefined

    }
    this.init()
  }

  init(){
    Ajax.ajax({
      url: 'orders',
      data: {
        statistics: true,
        productId: this.props.params.productId
      },
      success: (json) => {
        console.log(json)
        var data = this.state.data;
        data = json.data;
        this.setState({
          data: data,
          count: json.count,
          maleCount:json.maleCount,
          femaleCount:json.femaleCount
        })
      }
    })

  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
        <div className="content-block-title" style={{whiteSpace: 'normal'}}>截止当前时间共有<i className="apply-num">{this.state.count}</i>人报名， 男生<i className="apply-num">{this.state.maleCount}</i>人，女生<i className="apply-num">{this.state.femaleCount}</i>人</div>
	       <List className="media-list" style={{marginTop:'10px'}}>
         {
          this.state.data ? this.state.data.map(orderItem => (
             <Link to={'/order/'+orderItem.id} className="item-link item-content" key={orderItem.id}>
              <div className="item-media"><img src={orderItem.applicant.avatar || require('../../resources/svg/avatar.svg')} width="44"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">{orderItem.applicant.realname}</div>
                </div>
                <div className="item-subtitle">{orderItem.applicant.mobile}</div>
              </div>
            </Link>
          )) : ''
         }
             
         </List>
	    </div>
	  </div>
  	)
  }
}

module.exports = OrdersPage
