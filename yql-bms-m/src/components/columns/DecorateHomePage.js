import React  from 'react';
import Page from 'react-ui/page'
import ProductList from '../products/HScrollProductList'
import LazyLoad from 'react-ui/lazy-load'
import Ajax from '../../ajax'
import ProductsAction from '../../actions/ProductsAction'
import ProductsStore from '../../stores/ProductsStore'
import classNames from 'classnames';
import {Link} from 'react-router'
import ReactUI from 'react-ui/react-ui'
import DecorationTypeSelecter from './DecorationTypeSelecter'
import $ from 'react-ui/dom'
// import createFragment from 'react-addons-create-fragment'
import Slider from '../widget/Slider'
import SliderEditorView from './SliderEditorView'
import BannerEditorView from './BannerEditorView'
import RecommendProductEditor from './RecommendProductEditor'
require('../../resources/less/decorate-home-page.less')
  

function getStateFromStores() {
  return {
    data: ProductsStore.getAll(),
    loadFinished: ProductsStore.isLoadFinished()
  };
}

class DecorateHomePage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      loadFinished: false,
      data:[],
      navbarOpacity: 0
    }

  }

  componentDidMount(){

    var handleClickButtonAppend =  (e) =>{
      e.preventDefault();
      this.appendDecoration()
    }
    $(document).on('click', '.button-append', handleClickButtonAppend)

    this.destroyList.push(() => { $(document).off('click', '.button-append', handleClickButtonAppend)})

    var onChange = this.onChange.bind(this)
    ProductsStore.addChangeListener(onChange)

    this.destroyList.push(() => {ProductsStore.removeChangeListener(onChange)})

    this.init()
  }

  query(queryParams,cb) {
    Ajax.ajax({
     url: 'columns',
     data: queryParams,
     success: (json) => {
      if(!json.error){
        cb && cb(json.data)
      }
      
     }
    })
  }


  init(){
    this.queryParams = {
        page: 'home'
     }

    let loadFirst = () => {
      this.query(this.queryParams, (data) => {
        

        ProductsAction.loadFirst(data)
        var lazyload = new LazyLoad({scrollContainer: this.refs.pageContent.querySelectorAll('.hscroll-container')})
        this.destroyList.push(() => {lazyload.destroy()})

        var pageContentlazyload = new LazyLoad({scrollContainer: this.refs.pageContent})
        this.destroyList.push(() => {pageContentlazyload.destroy()})
        
        setTimeout( () => {
          lazyload.handleLazy()
        }, 500)
        //setTimeout(() => new LazyLoad({pageContainer: this.refs.pageContent, placeholder: false}), 500)
      })
    }

    loadFirst()
  }
  
  onChange(){
    let state = getStateFromStores();
    if(state.loadFinished){

    }
    // console.log('onChange', state)
    this.setState(state)
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
      $('.decorate-home-navbar-inner').css({
        background: 'rgba(53, 52, 58, ' + opacity + ')'
      })
    }
  }

  handleSelectCity(value){
    this.queryParams.cityCode = value.city.code
    this.query(this.queryParams, (data) => {
      ProductsAction.loadFirst(data)
       
      //setTimeout(() => new LazyLoad({pageContainer: this.refs.pageContent, placeholder: false}), 500)
    })
  }
  appendDecoration(){
    this.openDecorationTypeSelecter({
      operation: 'append'
    })
  }

  updateDecoration(index){
    this.openEditor({
      operation: 'update',
      index: index,
      type: this.state.data[index].type
    })
  }

  insertDecoration(index){
    this.openDecorationTypeSelecter({
      operation: 'insert',
      index: index
    })
  }

  deleteDecoration(index){
    var data = this.state.data
    data.splice(index, 1);
    this.setState({
      data: data
    })
  }

  moveUp(index){
    var data = this.state.data
    var tmp = data[index] 
    data[index] = data[index-1]
    data[index-1] = tmp
    this.setState({
      data: data
    })
  }

  openEditor(option){
    var me = this
    var type = option.type, index = option.index;

    if(type === 'banner') {
      BannerEditorView.open({
        value: option.operation ==='update'? this.state.data[index] : undefined,
        onOk:  (column) => {
          // column.key = ReactUI.guid()
        
          var data = me.state.data;
          if(option.operation === 'append'){
            column.key = ReactUI.guid()
            data.push(column)
          } else if(option.operation === 'insert'){
            column.key = ReactUI.guid()
            data.splice(index+1, 0, column)
          } else if(option.operation === 'update'){
             data[index] = column
          }
          
          me.setState({
            data: data
          })
          // console.log(me.state.data)
          window.mainView.router.back({
              force: true,
              pageName: me.props.pageName
          });
          
        }
      })
       
    } else if(type === 'slider') {
      SliderEditorView.open({
        value: option.operation ==='update'? this.state.data[index] : undefined,
        onOk:  (column) => {
          // column.key = ReactUI.guid()
          
          var data = me.state.data;
          if(option.operation === 'append'){
            column.key = ReactUI.guid()
            data.push(column)
          } else if(option.operation === 'insert'){
             column.key = ReactUI.guid()
             data.splice(index+1, 0, column)
          } else if(option.operation === 'update'){
             data[index] = column
          }
          
          me.setState({
            data: data
          })
          // console.log(me.state.data)
          window.mainView.router.back({
              force: true,
              pageName: me.props.pageName
          });
          
        }
      })
       
    } else if(type === 'product'){
      var index = option.index;
      RecommendProductEditor.open({
        value: option.operation ==='update'? this.state.data[index] : undefined,
        onOk:  (column) => {
          var data = me.state.data;
          if(option.operation === 'append'){
            column.key = ReactUI.guid()
            data.push(column)
          } else if(option.operation === 'insert'){
             column.key = ReactUI.guid()
             data.splice(index+1, 0, column)
          } else if(option.operation === 'update'){
             data[index] = column
          }
          
          me.setState({
            data: data
          })
          // console.log(me.state.data)
          window.mainView.router.back({
              force: true,
              pageName: me.props.pageName
          });
          
        }
      })
    }
  }

  openDecorationTypeSelecter(option){
    DecorationTypeSelecter.open({
      onSelect:  (type) =>{
       option.type = type;
       this.openEditor(option)
      }
    });

  }

  publish(){
    var data = this.state.data;
    Ajax.ajax({
      url: '/columns/update',
      method: 'POST',
      contentType: 'applicaton/json',
      data: JSON.stringify(data),
      success: (json) => {
        if(!json.error){
          alert('发布成功')
        }
      }
    })
  }

  render(){
    return (
      <div className={classNames('page toolbar-through decorate-home-page')}  data-page={this.props.pageName}>
        <div className="page-content" style={{background: '#383c3d'}} ref="pageContent" onScroll={this.handleScroll.bind(this)}>
          {
            (() => {
              if(this.state.data && this.state.data.length>0) {
                return this.state.data.map(  (child, index) => {
                  if('banner' === child.type && child.contentEntity.length === 1) {
                    return (
                      <div className="section banner" key={child.id || +new Date()+index}>
                        <img src={child.contentEntity[0].url} width="100%"/>
                        <div className="decorate-toolbar">
                          <a className="button" onClick={this.handleDeleteDecoration.bind(this, index)}> 删除 </a>
                          {index === 0 ? '': <a className="button" onClick={this.handleMoveUp.bind(this, index)}> 上移 </a>}
                          <a className="button" onClick={this.handleUpdateDecoration.bind(this, index)}> 编辑 </a>
                          <a className="button" onClick={this.handleInsertDecoration.bind(this, index)}> 插入 </a>
                        </div>
                      </div>
                    )
                  }
                  else if('slider' === child.type && child.contentEntity.length > 1) {
                    return (
                      <Slider key={child.id || +new Date()+index} data={child.contentEntity}  style={{position: 'relative', marginBottom: '10px'}}>
                        <div className="decorate-toolbar">
                          <a className="button" onClick={this.handleDeleteDecoration.bind(this, index)}> 删除 </a>
                          {index === 0 ? '': <a className="button" onClick={this.handleMoveUp.bind(this, index)}> 上移 </a>}
                          <a className="button" onClick={this.handleUpdateDecoration.bind(this, index)}> 编辑 </a>
                          <a className="button" onClick={this.handleInsertDecoration.bind(this, index)}> 插入 </a>
                        </div>
                      </Slider>
                    )
                  } else if('product' === child.type) {
                    return (
                       <section className="section" key={child.id || +new Date()+index}>
                        <div className="item-content item-link">
                          <div className="item-inner">
                            <div className="item-title">{child.title}</div>
                            <div className="item-after">更多</div>
                          </div>
                        </div>
                        <ProductList data={child.contentEntity}/>
                        <div className="decorate-toolbar">
                          <a className="button" onClick={this.handleDeleteDecoration.bind(this, index)}> 删除 </a>
                          {index === 0 ? '': <a className="button" onClick={this.handleMoveUp.bind(this, index)}> 上移 </a>}
                          <a className="button" onClick={this.handleUpdateDecoration.bind(this, index)}> 编辑 </a>
                          <a className="button" onClick={this.handleInsertDecoration.bind(this, index)}> 插入 </a>
                        </div>
                      </section>
                    )
                  }
                });
              } else {
                return <div className="content-none">正在加载...</div>
              }
            })()
          }
          
        </div>
        {/*page-conetnt*/}

        <div className="toolbar">
          <div className="toolbar-inner single-button-toolbar-inner">
            <a className="button button-fill" onClick={this.publish.bind(this)}>发布</a>
          </div>
        </div>
        {/*toolbar*/}
      </div>

    );
  }

  handleUpdateDecoration(index, e){
    e.preventDefault()
    this.updateDecoration(index)
  }

  handleInsertDecoration(index, e){
    e.preventDefault()
    this.insertDecoration(index)
  }

  handleDeleteDecoration(index, e){
    e.preventDefault()
    this.deleteDecoration(index)
  }

  handleMoveUp(index, e){
    e.preventDefault()
    this.moveUp(index)
  }
  
}

module.exports = DecorateHomePage
