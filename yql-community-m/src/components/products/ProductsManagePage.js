import React  from 'react';
import AnimationPage from '../Page'
import classNames from 'classnames';
import ProductList from './ProductList'
// import Ajax from '../../ajax'
// import Auth from '../../services/Auth'
// import history from '../../history' 
require('../../resources/less/products-manage-page.less')

class ProductsManagePage extends AnimationPage{
  constructor(props) {
    super(props);
  }

  
   
  componentDidMount(){
    // Ajax.ajax({
    //   method: 'GET',
    //   url: 'products',
    //   data: {
    //     community: Auth.getCommunityId()
    //   },
    //   success:  (json) => {
    //     console.log('ProductsManagePage', this, json)
    //   },
    //   error: (err) => {
    //     console.error(err)
    //   }
    // })
  }
  
  render(){
    return (
    <div className={classNames( 'page products-manage-page', this.props.className)}>
      <div className="tabs-animated-wrap">
        <div className="tabs">
          <div id="tab-active" className="page-content tab active">
            <ProductList status="active"/>
          </div>
           
          <div id="tab-end" className="page-content tab">
            <ProductList status="end"/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

module.exports = ProductsManagePage

