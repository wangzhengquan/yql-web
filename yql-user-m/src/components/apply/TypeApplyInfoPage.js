import React  from 'react';
import AnimationPage from '../Page'
import classnames from 'classnames';
import {List} from 'react-ui/lists'
import Auth from '../../services/Auth'
import Ajax from '../../ajax'
import history from '../../history'
import moment from 'moment'
require('react-ui/resources/less/forms.less')

class TypeApplyInfoPage extends AnimationPage{
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      data: Auth.getUser()
    }
  }
   
  componentDidMount(){
    super.componentDidMount()
  }
  
  handleOk(e){
    e.preventDefault()
    if(this.state.disabled) return

    this.setState({
      disabled: true
    })
    var user = this.state.data;
    // user.birthday = new Date(...user.birthday.split('-'))
    Ajax.ajax({
      url: '/user/update',
      method: 'PUT',
      contentType: 'applicaton/json',
      data: JSON.stringify(user),
      success: (json) => {
        if(!json.error){
          var nextPath = sessionStorage.getItem('nextPath') || '/'
          sessionStorage.removeItem('nextPath')
          history.push(nextPath)
          return;
        }
        this.setState({
          disabled: false
        })
      }
    })

  }
  render(){
  	return (
  	<div className={classnames( 'page', this.props.className)}>
	    <div className="page-content">
	      <List style={{marginTop: '10px'}}>
          <div className="item-content">
            <div className="item-inner">
              <div className="item-title label">名字</div>
              <div className="item-input">
                <input type="text" value={this.state.data.realname || ''}  onChange={this.handleChangeRealname.bind(this)}/>
              </div>
            </div>
          </div>

          <div className="item-content" >
            <div className="item-inner">
              <div className="item-title label">性别</div>
              <div className="item-input">
                <select value={this.state.data.sex || ''} onChange={this.handleChangeSex.bind(this)}  style={{height: 'auto'}}>
                  <option value=''>请选择</option>
                  <option value='1'>男</option>
                  <option value='0'>女</option>
                </select>
              </div>
            </div>
          </div>
          <li>
            <div className="item-content">
              <div className="item-inner">
                <div className="item-title label">出生年月</div>
                <div className="item-input">
                  <input type="date" placeholder="出生年月"  onChange={this.handleChangeBirthday.bind(this)} style={{height: 'auto'}} value={this.state.data.birthday? moment(this.state.data.birthday).format('YYYY-MM-DD'): moment().format('YYYY-MM-DD')} />
                </div>
              </div>
            </div>
          </li>
        </List> 
	    </div>

      <div className="toolbar">
        <div className="toolbar-inner single-button-toolbar-inner" >
          <a className="button button-fill bg-green button-enter" onClick={this.handleOk.bind(this)} disabled={this.state.disabled}>完成</a>
        </div>
      </div>
	  </div>
  	)
  }

  handleChange(){
    var data = this.state.data
     
    this.setState({
      disabled: (!data.realname || !data.birthday || !data.sex)
    })
  }

  handleChangeRealname(e){
    e.preventDefault();
    var data = this.state.data;
    var oldValue = data.realname;
    var newValue = e.target.value;
    data.realname = newValue
    this.setState({
      data: data
    })
    this.handleChange('realname', newValue, oldValue, this.state.data)
  }

  handleChangeSex(e){
    e.preventDefault();
    var data = this.state.data;
    var oldValue = data.sex;
    var newValue = e.target.value;
    data.sex = newValue
    this.setState({
      data: data
    })
    this.handleChange('sex', newValue, oldValue, this.state.data)
  }

  handleChangeBirthday(e){
      e.preventDefault();
    var data = this.state.data;
    var oldValue = data.birthday;
    var newValue = moment(e.target.value)  ;
    data.birthday = newValue
    this.setState({
      data: data
    })
    this.handleChange('birthday', newValue, oldValue, this.state.data)
  }
}

module.exports = TypeApplyInfoPage
