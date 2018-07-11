import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import List from 'react-ui/lists'
import Ajax from '../../ajax'
import $ from 'react-ui/dom'
require('react-ui/resources/less/forms.less')
var data;
class Select extends React.Component{
  

    constructor(props) {
      super(props);
      this.state = {
      	value: this.props.value,
        data: data || []
      }
    }

    componentDidMount(){
      
      if(data){
        return;
      }
      Ajax.ajax({
        url: 'categroies',
        data: {
          level: 1
        }

      }).then(([json]) => {
        console.log('json==', json)
        if(!json.error){
          data = json.data;
          this.setState({
            data: json.data
          })
        }
      }, ([error]) => {
        console.error('error', error)
      })
    }

    handleChange(item){
    	this.setState({value: item.id});
    	this.props.onSelect && this.props.onSelect(item)

    }

    handleRadioChange(evnet){
      alert('change')
    }
    
    render(){
       return (
       	 <List>
         {
            
            this.state.data.map((item) => (
              <label className="label-radio item-content"  key={item.id} onChange={this.handleChange.bind(this, item)} >
                <input type="radio" name="category" value={item.id}  onChange={this.handleChange.bind(this, item)} checked={this.state.value===item.id ? 'checked': false} />
                <div className="item-inner">
                  <div className="item-title">{item.name}</div>
                </div>
              </label>
            ))
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
    
    let res = window.mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
        '    <div class="center sliding">选择类别</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div class="page desc-editor-page navbar-through">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );

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