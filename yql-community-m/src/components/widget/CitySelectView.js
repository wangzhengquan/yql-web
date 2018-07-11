import React  from 'react';
import ReactDOM from 'react-dom';
import {List} from 'react-ui/lists'
import Ajax from '../../ajax'
import $ from 'react-ui/dom'
import t7 from 'react-ui/template'
import Views from 'react-ui/views'
import PARAMS from '../../params'
require('react-ui/resources/less/forms.less')
require('../../resources/less/city-select-view.less')
var  hideNavbar = PARAMS.hideNavbar

class PageContent extends React.Component{
  constructor(props) {
    super(props);
    // var value =  {
    //   province: {id: '370000',code: '370000', name: '山东省', parent: '1', level: 2},
    //   city: {id: '371100', code: '371100', name: '日照市', parent: '370000', level: 3}
    // }
    var value = this.props.value || {}

    this.state = {
      data: {},
      value: value
    }
    
    this.count = 0;
  }

  componentDidMount(){
    this.init()
  }

  init(){
    this.fillProvinces()
    if(this.state.value.province) {
      this.fillCitys(this.state.value.province.code)
    } 
  }

  componentDidUpdate(){
    if(this.props.onChange &&  this.count>0){
      this.props.onChange(this.state.value)
    } 
    this.count +=  1;
  }

  fillProvinces(){
    Ajax.ajax({
      url: '/regions',
      method: 'GET',
      data: {
        level: 2
      },
      success: (json) => {
        
        if(json.error){
          return;
        }

        var provinces = json.data;
        var data = this.state.data ;
        data['provinces'] = provinces
        this.setState({
          data: data
        })

        
      }
    })
  }

  fillCitys(provinceCode, cb){
    Ajax.ajax({
      url: '/regions',
      method: 'GET',
      data: {
        level: 3,
        parent: provinceCode
      },
      success: (json) => {
        
        if(json.error){
          return;
        }
        var citys = json.data;
        var data = this.state.data;
        data.citys= citys;
        this.setState({
          data: data
        })
        cb && cb(citys)
      }
    })
  }

  onSelectProvince(e){
    e.preventDefault()
    var provinceCode = e.target.value;
    var value = this.state.value
    value.province =  this.state.data.provinces.filter((item) => {
      return item.code === provinceCode
    })[0];
    value.city = null;
    this.setState({
      value: value
    })
    this.fillCitys(provinceCode, (citys) => {
      if(citys.length === 1){
        var value = this.state.value
        value.city = citys[0];
        this.setState({
          value: value
        })
      }
    })
  }

  onSelectCity(e){
    e.preventDefault()
    var cityCode = e.target.value;
    var value = this.state.value
    value.city = this.state.data.citys.filter((item) => {
      return item.code === cityCode
    })[0];

    this.setState({
      value: value
    })
    
  }
   

  render(){
    return (
      <div>
        <List style={{marginTop: 0, marginBottom: 0}}>
          <div className="icon-arrow-down item-link item-content">
            <div className="item-inner"> 
              <div className="item-title label">省份</div>
              <div className="item-input"> 
                <select className="" onChange={this.onSelectProvince.bind(this)} value={this.state.value.province?this.state.value.province.code: ''}>
                  <option value=''>请选择</option>
                  {
                    this.state.data && this.state.data.provinces ? this.state.data.provinces.map((item) => (
                      <option key={item.code} value={item.code} >{item.name}</option>
                    )) : ''
                  } 
                </select>
              </div>
            </div>
          </div>

          <div className="icon-arrow-down  item-link item-content ">
            <div className="item-inner"> 
              <div className="item-title label">城市</div>
              <div className="item-input">
                <select className="" onChange={this.onSelectCity.bind(this)} value={this.state.value.city ? this.state.value.city.code: ''}>
                  <option>请选择</option>
                  {
                    this.state.data && this.state.data.citys ? this.state.data.citys.map((item) => (
                      <option key={item.code} value={item.code} >{item.name}</option>
                    )) : ''
                  } 
                </select>
              </div>
            </div>
          </div>
        </List>
      </div>
    );
  }
  
}

var CitySelectView = {
  open (option) {
    window.mainView = window.mainView || Views.addView('.view-main', {
        // Enable Dynamic Navbar for this view
        dynamicNavbar: true
    });
    option = option || {}
    let res = window.mainView.router.loadContent( t7.compile(
        '<div class="view">' +
          '<!-- Top Navbar-->' +
          '{{#unless hideNavbar}}' +
          '<div class="navbar">' +
          '  <div class="navbar-inner navbar-on-center">' +
          '    <div class="left sliding" >' +
          '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>返回</span></a></div>' +
          '   </div>' +
          '   <div class="center sliding">选择城市</div>' +
          '   <div class="right sliding">' +
          '     <a class="ok link" disabled><span>确定</span></a>' +
          '   </div>' +
          ' </div>' +
          '{{/unless}}'+
          '</div>' +
          '<div class="pages">' +
          '  <!-- Page, data-page contains page name-->' +
          '  <div class="page  {{#if hideNavbar}}no-navbar toolbar-through {{else}} navbar-through{{/if}}">' +
          '    <!-- Scrollable page content-->' +
          '   <div class="page-content"></div>' +
          '   {{#if hideNavbar}}' +
          '   <div class="toolbar city-select-toolbar">'+
          '     <div class="toolbar-inner">'+
          '       <a class="cancel">取消</a>'+
          '       <a class="button button-fill ok" disabled>确定</a>'+
          '     </div>' +
          '   </div>' +
          '   {{/if}}'+
          '  </div>' +
          '</div>' +
        '</div>'
    )({
      hideNavbar: hideNavbar
    }));

    let page = res[1]
    let navbar = res[0]
    var bar =  navbar ? $(navbar) : $(page).find('.toolbar')
    var onChange = function(value) {
       if(value.province && value.city){
        $(bar).find('.ok').removeAttr('disabled')
       } else {
        $(bar).find('.ok').attr('disabled', 'disabled')
       }
    }

    var content =  ReactDOM.render(<PageContent onChange={onChange} value={option.value}/> , page.querySelector('.page-content'))
    $(bar).on('click', '.ok:not([disabled])' , (e) => {
      e.preventDefault()
      console.log('ok', content.state.value)
      var value = content.state.value;
      if(option.onOk) option.onOk(value)
      window.mainView.back();

    })
    $(bar).on('click', '.cancel' , (e) => {
      e.preventDefault()
      window.mainView.back();

    })
    return res;
  }
}
export default CitySelectView;


