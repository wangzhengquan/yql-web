import React  from 'react';
import Swiper from 'react-ui/swiper'
import classnames from 'classnames'
export default class SwipeSlider extends React.Component {

	constructor(props) {
	    super(props);
	    this.destroyList = []
	}

	componentDidMount(){
		this.initSlider()
	}

	initSlider(){
		if(this.props.data.length > 1){
			//var node = $(ReactDOM.findDOMNode(this));
			var node = this.refs.swiperContainer
			var params = Object.assign({pagination:'.swiper-pagination', autoplay: 4000, loop: true}, this.props.params)
		    let slider = new Swiper(node, params)
		    this.destroyList.push(() => {slider.destroy()})
		}

	}
	componentDidUpdate(){
		this.destroy()
		this.initSlider()
	}
	destroy(){
	    this.destroyList.forEach((fun) => {
	      fun()
	    })
	    this.destroyList = []
	}

	componentWillUnmount(){
		this.destroy()
	}

	render(){
	  var data = this.props.data;

      return (
		<div className={classnames('swiper-container swiper-init', this.props.className)} ref="swiperContainer" style={this.props.style}>
		  {
	      	React.Children.map(this.props.children, function (child) {
	          return child;
	        })
	      }
	      <div className="swiper-pagination color-white"></div>
	      <div className="swiper-wrapper">
	      {
		      data ? data.map( (banner, index) => (
		        <div className="swiper-slide" key={index}><img className="slide-img" src={banner.url}/></div>
		      )): ''
	      }
	      
	      </div>
	    </div>
      )
    }
}