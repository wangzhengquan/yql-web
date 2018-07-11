import React  from 'react';
import Page from '../Page'
import LazyLoad from 'react-ui/lazy-load'
import Ajax from '../../ajax'
import classNames from 'classnames'
import Tabs from 'react-ui/tabs'
import ProductList from '../products/ProductList'
// import TabIntro from './TabIntro'
import CommentList from '../comments/CommentList'
import TabDecorations from './TabDecorations'
import Loading from 'react-ui/widget/loading'
require('../../resources/less/community-page.less')


class GroupPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
       
    }

  }

  componentWillUnmount(){
    super.componentWillUnmount && super.componentWillUnmount()
    
  }

  componentDidMount(){
    super.componentDidMount()
    var me = this;
    var communityId = me.props.params.id;
    

    Ajax.ajax({
      url: 'community/'+communityId,
      method: 'GET',
      success: (json) => {
        var community = json.data
        
        this.setState({
          community: community
        }, () => {
          this.initTabs()
        })
      }

    })
    
  }

  initTabs() {
    var me = this;
    this.tabs = new Tabs({tabbar: this.refs.tabbar, tabbarHighlight: true})
    this.destroyList.push(()=>{this.tabs.destroy()})
    var lazyload = new LazyLoad({scrollContainer: this.refs.pageContent, placeholder: false})
    this.destroyList.push(() => {lazyload.destroy()})

    this.initHomeTab()

    this.tabs.on('show', (tab) => {
      if(tab.attr('id') === 'tab-all-product'){

        if(!tab.data('load_first')){
          tab.data('load_first', true)
          Ajax.ajax({
            url: 'products',
            method: 'GET',
            data: {
              community: me.props.params.id
               
            },
            success: function(json){
              me.setState({
                allProducts: json.data
              })
              lazyload.handleLazy()
            }

          })
        }
        
      }
      //TO DO 分页

    })
  }

  initHomeTab() {
    var communityId = this.props.params.id;
    Ajax.ajax({
      url: 'decorations/'+communityId,
      method: 'GET',
      success: (json) => {
        this.setState({
          decorations: json.data
        })
      }

    })
  }
   

  render(){
      
   
      return(
        <div  className={classNames('page community-page', this.props.className)} >
          {
            this.state.community ? (
              <div className="page-content" ref="pageContent">

                <div className="community-header">
                  <div  className="community-header-banner">
                    <div className="header-img-wrapper">
                      <img src={ this.state.community.headBanner || require('../../resources/img/community-head-banner.jpg') }/>
                    </div>
                    <div className="logo-wrapper">
                      <img src={this.state.community.logo || require('../../resources/img/logo.png')}/>
                    </div>
                  </div>
                  <div className="communityInfo">
                    <div className="name">{this.state.community.name}</div>
                    <div className="schame">{this.state.community.schame}</div>
                  </div>
                </div>

                <div className="tabbar" ref="tabbar">
                  <div className="tabbar-inner">
                      <a href="#tab-community-home" className="active tab-link">首页</a>
                      <a href="#tab-all-product" className="tab-link">全部活动</a>
                    {/*<a href="#tab-comment" className="tab-link">评价</a>*/}
                      
                  </div>
                </div>

                <div className="tabs-animated-wrap" style={{height: 'auto'}}>
                  <div className="tabs">
                    <div id="tab-community-home" className="tab active">
                      {this.state.decorations ? <TabDecorations data={this.state.decorations}/> : <Loading/>}
                    </div>

                    <div id="tab-all-product" className="tab" data-name="all_products">
                     {this.state.allProducts ? <ProductList data={this.state.allProducts} style={{padding: '10px'}}/> : <Loading/>} 
                    </div>

                    <div id="tab-comment" className="tab">
                      <CommentList/>
                    </div>

                  </div>
                </div>

              </div>
            ): <Loading/>
          }
          
        </div>
      ) 
    
    
  
  }
  
}

module.exports = GroupPage
