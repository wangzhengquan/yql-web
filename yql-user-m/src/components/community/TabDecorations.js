import React  from 'react';
import classnames from 'classnames';
import Slider from '../widget/Slider'
import Banner from '../widget/Banner'

class TabDecorations extends React.Component{
  constructor(props) {
    super(props);
  }
   
  render(){
  	return (
  	<div id={this.props.id} className={classnames(this.props.className)}>
      {
        this.props.data &&  this.props.data.length>0 ? this.props.data.map((item, index) => {
          if(item.type === 'slider'){
            return (
              <Slider className="component" data={item.contentEntity} key={item.id } params={{pagination:'.swiper-pagination'}} />
              )
          } else if(item.type === 'banner'){
            return (
            <Banner className="component"  url={item.contentEntity[0].url} key={item.id}/>
            )
          } else if(item.type === 'text'){
            return (
            <p className="text component" key={item.id}>
              {item.content}
            </p>
            )
          }
        }) : (<div className='tip-no-decorations'>主人很懒，没有装修</div>)
      }
       
      </div>
  	)
  }
}

module.exports = TabDecorations
