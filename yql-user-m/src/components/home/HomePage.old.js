import React  from 'react';
import Page from '../Page'
import Swiper from 'react-ui/swiper'
import ProductList from '../products/ProductList'
import LazyLoad from 'react-ui/lazy-load'
import Ajax from '../../ajax'
import {InfiniteScroll, InfiniteScrollPreloader} from 'react-ui/infinite-scroll'
import ProductsAction from '../../actions/ProductsAction'
import ProductsStore from '../../stores/ProductsStore' 
import HomeNavbar from './HomeNavbar'
import classNames from 'classnames';


require('../../resources/less/home-page.less')

let infiniteScroll = null
let lazyload = null;
let slider = null;
function getStateFromStores() {
  return {
    data: ProductsStore.getAll(),
    loadFinished: ProductsStore.isLoadFinished()
  };
}

class HomePage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      loadFinished: false,
      data:[],
      navbarOpacity: 0
    }

  }


  componentWillUnmount(){
    ProductsStore.removeChangeListener()
    infiniteScroll.destroy()
    lazyload.destroy()
    slider.destroy()
  }

  componentDidMount(){
    slider = new Swiper(this.refs.swiper,{pagination:'.swiper-pagination', autoplay: 3000, loop: true})

    infiniteScroll = new InfiniteScroll({infiniteContent: this.refs.pageContent, distance: 50})
    lazyload = new LazyLoad({pageContainer: this.refs.pageContent, placeholder: false})

    // Swiper.initPageSwiper(this.refs.page)
    ProductsStore.addChangeListener(this.onChange.bind(this))
    this.initLoad()
  }

  initLoad(){
    

    let query = (cb) => {
      Ajax.ajax({
       url: 'customer/products',
       success: (json) => {
        let data = json.data
        
         cb && cb(json.data)
       },
       error: (error) => {
         console.log('error', error)
       }
      })
    }

    let loadFirst = () => {
      query((data) => {
        

        ProductsAction.loadFirst(data)

        infiniteScroll.detachEvents()
        lazyload.detachEvents()

        infiniteScroll.attachEvents()
        lazyload.attachEvents()
        
        setTimeout( () => {
          lazyload.handleLazy()
        }, 500)
        //setTimeout(() => new LazyLoad({pageContainer: this.refs.pageContent, placeholder: false}), 500)
      })
    }

    loadFirst()
    
    let loading = false;
    infiniteScroll.bind('infinite', () => {
      // Exit, if loading in progress
        if (loading) return;
        // Set loading trigger
        loading = true;
        query((data) => {
          loading = false
          ProductsAction.loadMore(data)
        })
      console.log('=======infinite triiger')
    })

    
  }
  
  onChange(){
    let state = getStateFromStores(); 
    if(state.loadFinished){

      infiniteScroll.detachEvents()
      lazyload.detachEvents()
    }
    // console.log('onChange', state)
    this.setState(state)
  } 

  handleScroll(event){
    let opacity = event.target.scrollTop/200
    if(opacity > 1){
      opacity = 1
    }
    
    if(opacity !== this.state.navbarOpacity)
      this.setState({navbarOpacity: opacity})
  }

  render(){
    // this.renderCount = this.renderCount || 0;
    // this.renderCount++
    // console.log("renderCount", this.renderCount)
    return (
      <div className={classNames("page home-page", this.props.className)} ref="page" >
        <div className="navbar" style={{background: "rgba(53, 52, 58, " + this.state.navbarOpacity + ")"} }>
           <HomeNavbar /> 
        </div>

        <div className="page-content" ref="pageContent" onScroll={this.handleScroll.bind(this)}>
           
          <div ref="swiper" className="swiper-container swiper-init">
            <div className="swiper-pagination color-white"></div>
            <div className="swiper-wrapper">
              <div className="swiper-slide"><img src="//img.ucdn.static.helijia.com/zmw/upload/20160509/fbd45082b689445d99805c69776593d4.gif!/0/w-894/format-webp"/></div>
              <div className="swiper-slide"><img src="//img.ucdn.static.helijia.com/zmw/upload/20160509/777ba1ac9a0348b8b0ddd875079a7faf.gif!/0/w-894/format-webp"/></div>
              <div className="swiper-slide"><img src="//img.ucdn.static.helijia.com/zmw/upload/20160509/2734c485bfb6471a867bf9c315db7dd0.gif!/0/w-894/format-webp"/></div>
            </div>
          </div>

          <ProductList data={this.state.data}/>
     
          {this.state.loadFinished ? '': <InfiniteScrollPreloader/>}

        </div>
      </div>

    );
  }
  
}

module.exports = HomePage
