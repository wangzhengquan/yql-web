import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
// import MessageBox from 'react-ui/message-box'
import RecommendProductListView from './RecommendProductListView'
require('react-ui/resources/less/lists.less')
require('react-ui/resources/less/content-block.less')
 
require('../../resources/less/recommend-product-editor.less')
class RecommendProductEditorArea extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        data : this.props.value || {
          type: 'product',
          title: ''
        }
      }
    }

    componentDidUpdate(){
      this.props.onChange && this.props.onChange(this.state.data)
    }

    handleAppendProduct(e){
      e.preventDefault()
      RecommendProductListView.open({
        onSelect: (product) => {
          var data = this.state.data;
          var contentEntity = data.contentEntity || [];
          data.contentEntity =contentEntity
          contentEntity.push(product);
          this.setState({
            data: data
          })
        }
      })
    }

    handleReplaceProduct(index, e){
      e.preventDefault()
      RecommendProductListView.open({
        onSelect: (product) => {
          var data = this.state.data;
          var contentEntity = data.contentEntity ;
          contentEntity.splice(index, 1, product);
          this.setState({
            data: data
          })
        }
      })
    }

    handleDeleteProduct(index, e){
      // MessageBox.confirm('确定删除该推荐作品吗')
      e.preventDefault()
      var data = this.state.data;
      var contentEntity = data.contentEntity ;
      contentEntity.splice(index, 1);
      this.setState({
        data: data
      })
    }




    render() {
       return (
        <div className="recommend-editor-area">
          <div  className="list-block" style={{marginTop: '10px'}}>
            <ul>
              <li>
                <div className="item-content">
                  <div className="item-inner"> 
                    <div className="item-title label">列表名称</div>
                    <div className="item-input">
                      <input type="text" onChange={this.handleTitleChange.bind(this)} value={this.state.data.title} placeholder="请填写列表名称,20字以内"/>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="item-content">
                  <div className="item-inner"> 
                    <div className="item-title label">列表链接</div>
                    <div className="item-input">
                      <input type="text" onChange={this.handleLinkChange.bind(this)} value={this.state.data.link||''} placeholder="请填写列表链接"/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          { (() => {
            // body...
            if(this.state.data.contentEntity && this.state.data.contentEntity.length > 0 ){
              return [
                <div className="content-block-title" key="content-block-title">推荐活动列表</div>,
                <div className="list-block media-list product-manage-list" key="list-block">
                 <ul>
                 {
                 this.state.data.contentEntity.map((item, index) => (
                   <li key={item.id}>
                   <div className="product-item-content item-content">
                     <div className="item-media"><img src={item.images[0]} width="80" height="80"/></div>
                     <div className="item-inner">
                        
                       <div className="item-title">{item.name}</div>
                       <div className="item-title-row">
                        <div className="">{item.price===0? '免费': '¥'+item.price}</div>
                        <div className="item-after" style={{marginRight: '15px'}}>{item.statusName || ''} </div>
                       </div>
                       <div className="item-text">{item.desc}</div>
                     </div>
                   </div>

                    <div className="product-toolbar toolbar tabbar tabbar-labels ">
                     <div className="product-toolbar-inner toolbar-inner tabbar tabbar-labels">
                       <a className="tab-link" onClick={this.handleReplaceProduct.bind(this, index)}>
                         <i className="iconfont icon-edit"></i>
                         <span className="tabbar-label">更换</span>
                       </a>
                       <a className="tab-link" onClick={this.handleDeleteProduct.bind(this, index)}>
                         <i className="iconfont icon-delete"></i>
                         <span className="tabbar-label" >删除</span>
                       </a>
                     </div>
                   </div>
                  </li>
                 ))
                 }
                 </ul>
              </div>
              ]
            } else {
              return ''
            }
          })()}

         
          

        <div className="add-product-toolbar"><button onClick={this.handleAppendProduct.bind(this)} className="button button-fill">添加活动</button></div>
      </div>
     	);

    }

    handleTitleChange(e){
      var data = this.state.data;
      data.title = e.target.value;
      this.setState({
        data: data
      })
    }

    handleLinkChange(e){
      var data = this.state.data;
      data.link = e.target.value;
      this.setState({
        data: data
      })
    }
}

var RecommendProductEditor = {
	open (option) {
    option = option || {}
    window.mainView = window.mainView || Views.addView('.view-main', {
        // Enable Dynamic Navbar for this view
        dynamicNavbar: true
    });
    
    let res = window.mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
        '    <div class="center sliding">' + ((option && option.title) || '编辑推荐作品') + '</div>' +
        '    <div class="right sliding"><a class="ok link disabled"><span>确定</span></a></div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div class="page recommend-product-editor-page navbar-through toolbar-through">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content"></div>' +
        '  </div>' +
        '</div>'
    );

    let page = res[1]
    let navbar = res[0]
    let okButton = $(navbar).find('a.ok');
    var onChange = function(value){
      if(value.contentEntity && value.contentEntity.length>0){
        okButton.removeClass('disabled')
      } else {
        okButton.addClass('disabled')
      }
    }
    var editorArea = ReactDOM.render(<RecommendProductEditorArea onChange={onChange} value={option.value} />, page.querySelector('.page-content'))
    okButton.on('click', function(e){
      e.preventDefault()
      if(okButton.hasClass('disabled')){
        return;
      }
      var value = editorArea.state.data
      value.content = value.contentEntity.map(function(item){
        return item.id
      }).join(',')
      option.onOk && option.onOk(value)
      window.mainView.back()
    })
    return res
  }
}
export default RecommendProductEditor;