import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import List from 'react-ui/lists'
import Ajax from '../../ajax'
import $ from 'react-ui/dom'
import PARAMS from '../../params'
import t7 from 'react-ui/template'
require('react-ui/resources/less/forms.less')

var  hideNavbar = PARAMS.hideNavbar
class Select extends React.Component{
  

    constructor(props) {
      super(props);
      this.state = {
      	value: this.props.value
      }
    }

    componentDidMount(){
      Ajax.ajax({
        url: 'categories'
      }).then(([json]) => {
        if(!json.error){
          
          this.setState({
            data: json.data
          })
        }
      })
    }

    handleChange(item){
    	this.setState({value: item.id});
    	this.props.onSelect && this.props.onSelect(item)

    }

    render(){
       return (
       	 <List>
         {
            
            this.state.data ? this.state.data.map((item) => (
              <label className="label-radio item-content"  key={item.id} onChange={this.handleChange.bind(this, item)} >
                <input type="radio" name="category" value={item.id}  onChange={this.handleChange.bind(this, item)} checked={this.state.value===item.id ? 'checked': false} />
                <div className="item-inner">
                  <div className="item-title">{item.name}</div>
                </div>
              </label>
            )) : ''
         }
       	 
       	 </List>
       	);

    }
}

 



var CategorySelectView = {
	open (option) {
    window.mainView = window.mainView || Views.addView('.view-main', {
        // Enable Dynamic Navbar for this view
        dynamicNavbar: true
    });
    
    let res = window.mainView.router.loadContent(t7.compile(
        '<div class="view">'+
        '<!-- Top Navbar-->' +
        '{{#unless hideNavbar}}'+
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
        '    <div class="center sliding">选择类别</div>' +
        '  </div>' +
        '</div>' +
        '{{/unless}}' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div class="page {{#if hideNavbar}}no-navbar toolbar-through {{else}} navbar-through{{/if}}">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '    </div>' +
        '  </div>' +
        '</div>'+
        '</div>'

    )({
      hideNavbar: hideNavbar
    }));

    let page = res[1]
    var onSelect =  (value) => {
      $(page).trigger('select', {value: value})
      window.mainView.back()
    }

    ReactDOM.render(<Select onSelect={onSelect} value={option && option.value ? option.value : undefined} />, page.querySelector('.page-content'))
    return res;
  }
}
export default CategorySelectView;