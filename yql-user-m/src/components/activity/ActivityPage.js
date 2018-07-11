import React  from 'react';
import AnimationPage from '../Page'
import classNames from 'classnames';
require('react-ui/resources/less/content-block.less');
require('react-ui/resources/less/forms.less');
require('styles/activity.less');

class ActPage extends AnimationPage{
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

module.exports = ActPage
