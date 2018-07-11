import React  from 'react';
import {Link} from 'react-router'
import AnimationPage from '../Page'
import classNames from 'classnames';
import {List} from 'react-ui/lists'
require('react-ui/resources/less/content-block.less')
require('react-ui/resources/less/forms.less')
require('styles/actList.less');

class ActListPage extends AnimationPage{
  constructor(props) {
    super(props);
  }

   
  render(){
    return (
    <div className={classNames('page', this.props.className)} data-page={this.props.pageName}>
      <div className="page-content">
        <div className="content-block-title">Product</div>
         

      </div>
    </div>
    );
  }

   
  
}

module.exports = ActListPage
