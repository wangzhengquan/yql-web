import React  from 'react';
import {Link} from 'react-router'
import AnimationPage from 'react-ui/page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import Ajax from 'react-ui/ajax'
class TmpPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
    Ajax.ajax({
      crossDomain: true,
      url: 'https://api.m.tmall.com/h5/com.taobao.mtop.deliver.getdivisionchild/2.0/?appKey=12574478&t=1467208537415&sign=9ece3c4bd129a09c80836133e1c8df1a&api=com.taobao.mtop.deliver.getDivisionChild&v=2.0&type=originaljson&dataType=json&data=%7B%22divisionCode%22%3A1%7D',
      headers: {
        cookie: document.cookie,
        test: '123',
        'Access-Control-Allow-Origin': '*'
      },
      beforeSend: function(request) {
          request.setRequestHeader("cookie", document.cookie);
      },

      success: function (json) {
        console.log(json)
      },
      error: function(error) {
        console.error(error)
      }

    })
  }
  
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	         
	    </div>
	  </div>
  	)
  }
}

module.exports = TmpPage
