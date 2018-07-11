import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
// import classnames from 'classnames'
import $ from 'react-ui/dom'
require('../../resources/less/searchbar.less')

class SearchContent extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render(){
       return (
       	<div style={{marginTop: '10px'}}>
       	</div> 
       );

    }
}


var SearchProductView = {
	open (option) {
		var defaultOption = {
		}
		if(!option){
			option = defaultOption
		}else{
			for(var p in defaultOption){
				if(option[p] === undefined){
					option[p] = defaultOption[p]
				}
			}
		}
	    window.mainView = window.mainView || Views.addView('.view-main', {
	        // Enable Dynamic Navbar for this view
	        dynamicNavbar: true
	    });
	    
	    let res = window.mainView.router.loadContent(
	        '<!-- Top Navbar-->' +
	        '<div class="navbar">' +
	        '  <div class="navbar-inner search-navbar">' +
	        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><a></div>' +
	        '    <div class="center">'+
	        '		<form class="searchbar searchbar-active" style="padding: 0px;">'+
	        '			<div class="searchbar-input"><input type="search" value="" placeholder="搜索"><a href="#" class="searchbar-clear"></a></div>'+
	        '		</form>'+
	        '	 </div>' +
	        '  </div>' +
	        '</div>' +
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page navbar-through">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content">' +
	        '    </div>' +
	        '  </div>' +
	        '</div>'
	    );

	    let page = $(res[1])
	    let navbar = $(res[0])
	    setTimeout(function(){
	    	 navbar.find('input[type=search]')[0].focus()
	    }, 0)
	   
	    $('#app-toolbar').hide()
	    page.on('pageBeforeRemove', () => {
	    	$('#app-toolbar').show()
	    })
	    navbar.on('submit', 'form.searchbar', function(e) {
	    	e.preventDefault()
	    	var value = $(this).find('input[type=search]').val()
	    	option.onSubmit && option.onSubmit(value)
	    	window.mainView.back()
	    })
	    
	    var searchContent = ReactDOM.render(<SearchContent />, page.find('.page-content')[0])
	     
	    return res
    }
}
module.exports=SearchProductView;