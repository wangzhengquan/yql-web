import React  from 'react';
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { Link } from 'react-router'
import ProductStatus from '../../constants/ProductStatus'
import $ from 'react-ui/dom'
import HScroll from 'react-ui/widget/hscroll-container'

require('../../resources/less/hscroll-product-list.less')
var imgWidth='100%', imgHeight='';

class HScrollProductList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      imgWidth:imgWidth,
      imgHeight: imgHeight
      
    }
  }
  componentWillUnmount() {
    this.destoryList.forEach(fun => {
      fun();
    })
  }



  componentDidMount() {
    this.calcImgSize()
    this.destoryList = []
    var onResize = this.calcImgSize.bind(this);
    $(window).on('resize',  onResize);
    this.destoryList.push(() => {$(window).off('resize',  onResize);})
  }
  
  calcImgSize() {
    var node = this.node = this.node || ReactDOM.findDOMNode(this);
    imgWidth = node.clientWidth * 40/100 - 10;
    imgHeight = imgWidth 
    this.setState({
      imgWidth: imgWidth + 'px',
      imgHeight: imgHeight + 'px'
    })
  }

  render(){
    var me = this;
    return (
      <HScroll>
        {
          this.props.data && this.props.data.map((item) => {
            return (
              <div className="product-item" key={item.id}>
                <Link to={'/product/'+item.id} className="product-item-inner" data-product_id={item.id}>
                  <div className="product-img-wrapper" style={{width: me.state.imgWidth, height: me.state.imgHeight}}>
                    <img className="lazy product-img" data-src={(item.images && item.images.length>0) ? item.images[0] : ''}/>
                  </div>
                  <div className="product-info">
                    <h2 className="product-name ellipsis">{item.name}</h2>
                    <div className={classnames('product-status', {'disabled': !ProductStatus.canRegist(item.status)})}>{ProductStatus.getStatusLabel(item.status)}</div>
                    <p className="product-desc">
                      {item.desc}
                    </p>
                    <span className="product-price">
                      {
                        item.price ===0 ?(<span className="product-price-inner" style={{fontSize: '14px'}}>免费</span>) : (<span className="product-price-inner">{item.price}<i className="unit">元</i></span>)
                      }
                    </span>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </HScroll>
    )
  }
}

export default HScrollProductList