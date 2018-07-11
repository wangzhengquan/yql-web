import React  from 'react';
import { connect } from 'react-redux'
import Page from '../Page'
import ProductList from '../products/HScrollProductList'
import LazyLoad from 'react-ui/lazy-load'
import {fetchColumnsIfNeeded} from '../../actions/columns'
import classNames from 'classnames';
import $ from 'react-ui/dom'
import { Link } from 'react-router'
// import createFragment from 'react-addons-create-fragment'
import Slider from '../widget/Slider'

require('../../resources/less/home-page.less')
  

 
class HomePage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      
      navbarOpacity: 0
    }

  }

  componentDidMount(){

   const { dispatch } = this.props
   dispatch(fetchColumnsIfNeeded('home'))

   this.doLazyLoad()
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
     
    if(nextProps.selectedPosition !== this.props.selectedPosition) {
      
      dispatch(fetchColumnsIfNeeded('home', {
        cityCode: nextProps.selectedPosition.city.code
      }))
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    this.doLazyLoad()
  }

  doLazyLoad() {
    var lazyload = new LazyLoad({scrollContainer: this.refs.pageContent.querySelectorAll('.hscroll-container')})
    this.destroyList.push(() => {lazyload.destroy()})

    var pageContentlazyload = new LazyLoad({scrollContainer: this.refs.pageContent})
    this.destroyList.push(() => {pageContentlazyload.destroy()})
    
    setTimeout( () => {
      lazyload.handleLazy()
    }, 500)
  }

   
  handleScroll(event){
    if(event.target !== this.refs.pageContent){
      return;
    }
    let opacity = event.target.scrollTop/200
    if(opacity > 1){
      opacity = 1
    }
    
    if(opacity !== this.navbarOpacity){
      this.navbarOpacity = opacity
      // this.setState({navbarOpacity: opacity})
      $('.navbar-inner[data-page='+this.props.pageName+']').css({
        background: 'rgba(53, 52, 58, ' + opacity + ')'
      })
    }
  }

  render(){
    const {columns, isFetching} = this.props;
    const isEmpty = columns.length === 0;

    return (
      <div className={classNames('page home-page tabbar-labels-through')} ref="page" data-page={this.props.pageName}>
        <div className="page-content" ref="pageContent" onScroll={this.handleScroll.bind(this)}>
          {
            isEmpty ? isFetching ? 
            <div className="content-none">正在加载...</div> : 
            <div className="content-none">无数据</div> :
            columns.map((child, index) => {
              if('banner' === child.type && child.contentEntity.length === 1) {
                return (
                  <div className="section banner" key={child.id || +new Date()+index}>
                    <img src={child.contentEntity[0].url} width="100%"/>
                  </div>
                )
              }
              else if('slider' === child.type && child.contentEntity.length > 1) {
                return (
                  <Slider key={child.id} data={child.contentEntity}  style={{position: 'relative', marginBottom: '10px'}}>
                    
                  </Slider>
                )
              } else if('product' === child.type) {
                return (
                   <section className="section" key={child.id}>
                    <Link  to={child.Link || '#'} className="item-content">
                      <div className="item-inner">
                        <div className="item-title">{child.title}</div>
                        {
                          /*<div className="item-after">更多</div>*/
                        }
                        
                      </div>
                    </Link>
                    <ProductList data={child.contentEntity}/>
                     
                  </section>
                )
              }
            })
          }
        </div>
      </div>

    );
  }
  
}



function mapStateToProps (state) {
   const { columnsByPage , selectedPosition} = state

   return {
    selectedPosition,
    isFetching: true,
    columns: [],
    ...columnsByPage['home']

   }
}

module.exports =  connect(mapStateToProps)(HomePage)
// module.exports = HomePage
