import React  from 'react';
import Slider from 'react-ui/widget/slider'
// import classnames from 'classnames'
export default class SwipeSlider extends React.Component {

	constructor(props) {
	    super(props);
	    this.destroyList = []
	}

	componentDidMount(){
		 
	}

	 
	 
	 

	render(){
	  var data = this.props.data;

      return (
      	<Slider>
      		{
		      data.map( (banner, index) => (
		       <a href={banner.link} key={index}> <img className="slide-img" src={banner.url} /> </a>
		      ))
	      	}
      	</Slider>
		 
      )
    }
}