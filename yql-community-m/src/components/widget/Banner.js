import React  from 'react';
import classnames from 'classnames';

class Banner extends React.Component{
  constructor(props) {
    super(props);
  }
   
  
  render(){
  	return (
  	  <div className={classnames('banner', this.props.className)} style={{position: 'relative'}}>
	    <div className="banner-img-wrapper">
	      <img width="100%" src={this.props.url}/>
	    </div>
	    {
	    	this.props.children
	    }
	  </div>
  	)
  }
}

module.exports = Banner
