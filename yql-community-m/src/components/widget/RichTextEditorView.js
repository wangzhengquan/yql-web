import React  from 'react';
import ReactDOM from 'react-dom';
import Views from 'react-ui/views'
import $ from 'react-ui/dom'
import t7 from 'react-ui/template'
import Editor from 'react-ui/umeditor'
require('react-ui/resources/less/forms.less')
require('../../resources/less/text-editor.less')



var hideNavbar = false
 
 



var RichTextEditorView = {
	open (option) {
		var defaultOption = {
			maxLength: 5000
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
	   
	    let res = window.mainView.router.loadContent( t7.compile(
	    	'<div class="view">'+
	        '<!-- Top Navbar-->' +
	        '{{#unless hideNavbar}}' +
	        '<div class="navbar">' +
	        '  <div class="navbar-inner">' +
	        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
	        '    <div class="center sliding">' + ((option && option.title) || '文字编辑') + '</div>' +
	        '    <div class="right sliding">' +
          	'      <a class="ok link" disabled><span>确定</span></a>' +
          	'    </div>' +
	        '  </div>' +
	        '</div>' +
	        '{{/unless}}'+
	        '<div class="pages">' +
	        '  <!-- Page, data-page contains page name-->' +
	        '  <div class="page rich-text-editor-page navbar-through">' +
	        '    <!-- Scrollable page content-->' +
	        '    <div class="page-content"></div>' +
	        '  </div>' +
	        '</div>'+
	        '</div>'
	    )({
	    	hideNavbar: hideNavbar
	    }));

	    let page = res[1]
	    let navbar = res[0]
	    var bar =  navbar ? $(navbar) : $(page).find('.toolbar')
	     
	    var onChange = function(value){
	    	bar.find('.ok').removeAttr('disabled');
	    	 
	    }
	    var editorArea = ReactDOM.render(<Editor onChange={onChange} handlers={option.handlers} maxLength={option.maxLength} value={option && option.value ? option.value : ''} />, page.querySelector('.page-content'))
	    var onOk = (event) => {
	      var isLink = event.target.nodeName.toLowerCase() === 'a';
	      if(isLink) event.preventDefault()
	    
	      var value = editorArea.getContent();
	    
	      // if(value.length > option.maxLength){
	      // 	alert('输入字符长度不能大于'+ option.maxLength)
	      // 	return;
	      // }
	      if(option.onOk) option.onOk(value)
	  	  $(page).trigger('ok', {value: value})
	      window.mainView.back()
	    }

	    var onCancel = (event) => {
	    	event.preventDefault()
	    	window.mainView.back()
	    }
	    bar.on('click', '.cancel', onCancel)
	    bar.on('click', '.ok:not([disabled])', onOk)
	    
	    return res
    }
}
export default RichTextEditorView;