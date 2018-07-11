import React  from 'react';
import ReactDOM from 'react-dom';
import $ from 'react-ui/dom'
import {List} from 'react-ui/lists'
import Views from 'react-ui/views'
import t7 from 'react-ui/template'
import PARAMS from '../../params'

var hideNavbar = PARAMS.hideNavbar
class DecorationTypeSelecter extends React.Component{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }

   
  handleSelect(type, e){
    e.preventDefault();
    this.props.onSelect && this.props.onSelect(type)
  }
  
  render(){
  	return (
    <List>
      <a href="#" onClick={this.handleSelect.bind(this, 'text')} className="item-link item-content">
        <div className="item-inner"> 
          <div className="item-title">文字</div>
        </div>
      </a>

      <a href="#" onClick={this.handleSelect.bind(this, 'banner')} className="item-link item-content">
        <div className="item-inner"> 
          <div className="item-title">广告图</div>
        </div>
      </a>

      <a href="#"  onClick={this.handleSelect.bind(this, 'slider')}  className="item-link item-content">
        <div className="item-inner"> 
          <div className="item-title">轮播图</div>
        </div>
      </a>
    </List>
  	)
  }
}

var DecorationSelecterView = {
  open(){
    var mainView = window.mainView = window.mainView || Views.addView('.view-main', {
        // Enable Dynamic Navbar for this view
        dynamicNavbar: true
    });
    
    
    var result = mainView.router.loadContent(t7.compile(
        '<div class="view">'+
        '{{#unless hideNavbar}}'+
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
        '    <div class="center sliding">选择组件类型</div>' +
        '  </div>' +
        '</div>' +
        '{{/unless}}' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page {{#if hideNavbar}}no-navbar {{else}} navbar-through{{/if}}">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '    </div>' +
        '  </div>' +
        '</div>'+
        '</div>'
    )({
      hideNavbar: hideNavbar
    }));
    var page = result[1]
    var onSelect = function(type){
      $(page).trigger('select', {value: type})
    }
    ReactDOM.render(<DecorationTypeSelecter onSelect={onSelect}/>, page.querySelector('.page-content'))
    return result;
  }
}
export default DecorationSelecterView;
