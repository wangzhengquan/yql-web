import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
import Ajax from '../../ajax'
import Navbars from 'react-ui/navbars'
import Timer from 'react-ui/timer'

import SearchBar from 'react-ui/searchbar'
require('react-ui/resources/less/forms.less')
require('react-ui/resources/less/lists.less')
require('react-ui/resources/less/content-block.less')
require('../../resources/less/searchbar.less')
 
// require('../../resources/less/recommend-product-editor.less')
class RecommendProductList extends React.Component{
    constructor(props) {
      super(props);
      this.state = {

      }
      
    }

    handleChange(index, e){
      var value = this.state.data[index];
      this.setState({
        value: value
      })
      // console.log(e.target.checked,value  )
      e.target.checked  && this.props.onSelect(value)
    }


    render() {
       return (
        <div className="list-block media-list">
          <ul>
          {
            this.state.data ? this.state.data.map( (item, index) => {
              // console.log(item.id, this.state.value && this.state.value.id , this.state.value && this.state.value.id === item.id )
              return (
              <li key={item.id}>
                <label className="item-checkbox item-content">
                 
                  <div className="item-media"><img src={item.images[0]} width="80"/></div>
                  <div className="item-inner">
                    <div className="item-title">{item.name}</div>
                    <div className="item-title-row">
                      <div className="">{item.price===0? '免费': '¥'+item.price}</div>
                      <div className="item-after" style={{marginRight: '15px'}}>{item.statusName || ''} </div>
                    </div>
                    <div className="item-text">{item.desc}</div>
                    <input type="radio" value={item.id} onChange={this.handleChange.bind(this,index)} checked={this.state.value && this.state.value.id === item.id ? true: false}/>
                    <i className="icon icon-form-checkbox"></i> 
                  </div>
                </label>
              </li>)
            }) : ''
          }
            
            
          </ul>
        </div>
     	);

    }

     
}
var RecommendProductListView = {
	open (option) {
      option = option || {}
	    window.mainView = window.mainView || Views.addView('.view-main', {
	        // Enable Dynamic Navbar for this view
	        dynamicNavbar: true
	    });
	    
	    let res = window.mainView.router.loadContent(
	        '<!-- Top Navbar-->' +
	        '<div class="navbar">' +
	        '  <div class="navbar-inner navbar-search">' +
	        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i></a></div>' +
	        '    <div class="center sliding"></div>' +
	        '  </div>' +
	        '</div>' +
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page recommend-product-editor-page navbar-through toolbar-through">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content"></div>' +
          '    <div class="page-content search-content" style="display: none;" ></div>' +
	        '  </div>' +
	        '</div>'
	    );

	    let page = res[1]
      var searchContent = page.querySelector('.page-content.search-content');

      var onSelect = (value) => {
        // this.fire('select', poi)
        $(res[1]).trigger('select', {value: value})
        option.onSelect && option.onSelect(value)
        window.mainView.back()
      }
	    var recommendProductList = ReactDOM.render(<RecommendProductList onSelect={onSelect} value={option && option.value ? option.value : null} />, page.querySelector('.page-content'))
	    var searchProductList = ReactDOM.render(<RecommendProductList onSelect={onSelect}/>, searchContent)
      
      Ajax.ajax({
        url: '/products',
        data: {
          limit: 10
        },
        success: (json) => {
          // console.log('products limit===',json)
          if(json.error) return;

          recommendProductList.setState({
            data: json.data
          })
        }
      })

      var onSearch = Timer.bufferUnless(function(value){
        if(!value || value === ''){
          return;
        }
         
        Ajax.ajax({
          url: '/products',
          data: {
            keyword: value
          },
          success: (json) => {
            // console.log('products===',json)
            if(json.error) return;

            if(searchContent.style.display === 'none') searchContent.style.display = 'block'
            searchProductList.setState({
              data: json.data
            })
          }
        })


      }, 500, this)
       
      var onCancel = function(){
        searchContent.style.display = 'none'
      }
      ReactDOM.render(<SearchBar onChange={onSearch} onCancel={onCancel} cancelButton={true} overlay={true} />, res[0].querySelector('.center'))

      Navbars.sizeNavbar(res[0])
	    return res
    }
}
export default RecommendProductListView;