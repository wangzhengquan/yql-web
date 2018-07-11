import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import Ajax from '../../ajax'
require('../../resources/less/order-page.less')

class OrderPage extends AnimationPage{
    constructor(props) {
      super(props);
      this.state = {
      	data: undefined
      }
      this.init()
    }

    init(){
      Ajax.ajax({
        url: '/order/'+this.props.params.id,
        method: 'GET',
        success: (json) => {
          console.log(json)
          var data = this.state.data;
          data = json.data;
          this.setState({
            data: data
          })
        }
      })

    }
    
     
    render(){
       return (
        <div className={classnames( 'page order-page', this.props.className)}>

          <div className="page-content">
          {
            this.state.data ? 
          
            <List style={{marginTop: '10px'}}>
              <div className="item-content">
                <div className="item-inner item-logo"> 
                  <div className="item-title">头像</div>
                  <div >
                    <div className="avatar-wrapper">
                      <img src={ this.state.data.applicant.avatar || require('../../resources/svg/avatar.svg') }/>
                    </div>
                  </div>
                </div>
              </div> 

              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">名字</div>
                  <div className="item-after">
                  	{this.state.data ? this.state.data.applicant.realname : ''}
                  </div>
                </div>
              </div>

              <div className="item-content" >
                <div className="item-inner">
                  <div className="item-title">性别</div>
                  <div className="item-after">
                    {this.state.data ? this.state.data.applicant.sex === '1' ? '男' : '女' : ''}
                  </div>
                </div>
              </div>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">年龄</div>
                    <div className="item-after">
                     {this.state.data ? new Date().getFullYear() - new Date(this.state.data.applicant.birthday).getFullYear()+1 : ''}
                    </div>
                  </div>
                </div>
              </li>
            </List> : ''
          }
        </div>
      </div>
      );

    }

    

}
module.exports = OrderPage