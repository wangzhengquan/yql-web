import React  from 'react';
import Page from 'react-ui/page'
import { connect } from 'react-redux'
import ProductList from '../products/ProductList'
import LazyLoad from 'react-ui/lazy-load'
import {InfiniteScroll, InfiniteScrollPreloader} from 'react-ui/infinite-scroll'
import classNames from 'classnames';
import SearchBar from 'react-ui/searchbar'
import {fetchProductsIfNeeded} from '../../actions/products'

const limit = 2;
 

class ProductsPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

   

  componentWillUnmount(){
    super.componentWillUnmount()

  }

  componentDidMount(){
    this.params = {
      ...this.props.location.query,
      start: 0,
      limit
    }
    const { dispatch } = this.props
    dispatch(fetchProductsIfNeeded('products', {
      ...this.params
      
    }))

    var infiniteScroll = new InfiniteScroll({infiniteContent: this.refs.pageContent, distance: 50})
    this.destroyList.push(() => {infiniteScroll.destroy()})
    infiniteScroll.on('infinite', () => {
      // Exit, if loading in progress
      if ( this.props.isFetching || this.props.isLastPage ) return;
      // Set loading trigger
      this.params = {
        ...this.params,
        start: this.params.start + limit,
        limit
      }
      dispatch(fetchProductsIfNeeded('products', this.params))
    })

    this.doLazyLoad()
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
    console.log('...update.....')
    this.doLazyLoad()
  }

  doLazyLoad() {
    var lazyload = new LazyLoad({scrollContainer: this.refs.pageContent})
    this.destroyList.push(() => {lazyload.destroy()})
  }
  
  

  handleSearch(value){
    const { dispatch } = this.props
    this.params =  {
      keyword: value,
      start: 0,
      limit
    }
    dispatch(fetchProductsIfNeeded('products', this.params))
     
  }

   

  render(){
    var {products, isLastPage} = this.props
    return (
      <div className={classNames('page', this.props.className)} ref="page" data-page={this.props.pageName}>
        <SearchBar onSubmit={this.handleSearch.bind(this)}/>

        <div className="page-content" ref="pageContent" >

          <ProductList data={products} style={{paddingTop: '10px'}}/>
     
          {isLastPage ? '': <InfiniteScrollPreloader/>}

        </div>
      </div>

    );
  }
  
}

function mapStateToProps (state) {
   const { productsByPage } = state
   const {
    isFetching,
    isLastPage,
    items: products
   } = productsByPage['products'] || {
    isFetching: true,
    isLastPage: false,
    items: []
   }
   return {
    isFetching,
    isLastPage,
    products

   }
}

module.exports =  connect(mapStateToProps)(ProductsPage)
// module.exports = ProductsPage
