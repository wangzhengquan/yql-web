import React  from 'react';
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { Link } from 'react-router'
// import ProductStatus from '../../constants/ProductStatus'
import $ from 'react-ui/dom'


require('styles/actList.less')

class ProductList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    	imgWidth:'100%',
    	imgHeight: ''
      
    }
  }
  componentWillUnmount() {
  }

  componentDidMount() {
  	this.calcImgSize()
    $(window).on('resize',  this.calcImgSize.bind(this));
  }
  
  calcImgSize() {
    var node = this.node = this.node || ReactDOM.findDOMNode(this);
  	let imgWidth = node.clientWidth - 10*2
  	let imgHeight = imgWidth * 270/360
  	this.setState({
  	  imgWidth: imgWidth + 'px',
      imgHeight: imgHeight + 'px'
  	})
  }

  render(){
	  let me = this
    return (
      <ul className="product-list" style={this.props.style} ref="productList">
        {
          this.props.data && this.props.data.length>0 ? this.props.data.map((item) => {
            return (
              <div className="product-item" key={item.id}>
                <Link to={'/product/'+item.id} className="product-item-inner" data-product_id={item.id}>
                  <div className="product-img-wrapper" style={{width: me.state.imgWidth, height: me.state.imgHeight}}>
                    <img className="lazy product-img"  data-src={(item.images && item.images.length>0) ? item.images[0] : ''}/>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-desc">
                      {item.community ? <span className="community-name">{ item.community.name || ''}</span> : ''}
                      {item.desc}
                    </p>
                    <div className="clear-float">
                      <span className="product-price">
                        {
                          item.price ===0 ?(<span className="product-price-inner" style={{fontSize: '16px'}}>免费</span>) : (<span className="product-price-inner">{item.price}<i className="unit">元</i></span>)
                        }
                      </span>
                      <span className={classnames('product-status fr')}>已开始</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }) : <div style={{textAlign: 'center'}}>没有数据</div>
        }
      </ul>
    );
  }
  
}
export default ProductList