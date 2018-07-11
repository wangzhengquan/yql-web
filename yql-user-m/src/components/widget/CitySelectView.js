import React  from 'react';
// require('../../resources/less/product-list.less')
import {List} from 'react-ui/lists'
import Ajax from '../../ajax'
import Picker from 'react-ui/picker' 
import classnames from 'classnames'
require('../../resources/less/city-select-page.less')

 

class CitySelectView extends React.Component{
  constructor(props) {
    super(props);
    // var value =  {
    //   province: {id: '370000',code: '370000', name: '山东省', parent: '1', level: 2},
    //   city: {id: '371100', code: '371100', name: '日照市', parent: '370000', level: 3}
    // }
    var value = this.props.value

    this.state = {
      // value: this.props.value
      value: value
    }
  }

  componentDidMount(){
    var me = this;
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
        provinces.forEach(item => {
          item.id = item.code;
        })
        me.initPicker(provinces)

      }
    })
    // iOS Device picker
    
  }

  initPicker(provinces){
    var me = this,
        pickerCity;

    provinces.splice(0, 0, {
      name: '请选择',
      code: -1,
      id: -1
    })

    var setCityPikerValues = function(provinceCode, defaultValue){
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
          citys.forEach(item => {
            item.id = item.code;
          })

          var needAddSelectItem = citys.length> 1;
          var itemSelect;
          if(needAddSelectItem){
            itemSelect = {
              id: -1,
              name: '请选择',
              code: -1
            };
            citys.splice(0, 0,itemSelect)
          }
          pickerCity.params.cols[0].values=citys;
          pickerCity.params.cols[0].displayValues=(function(){
            var cityNameArr = []
            citys.forEach(function(item){
              cityNameArr.push(item.name)
            })
            return cityNameArr;
          })();

          if(defaultValue){
            pickerCity.setValue([defaultValue])
          }
          else if(needAddSelectItem){
            pickerCity.setValue([itemSelect])
          }else {
            // debugger
            pickerCity.setValue([citys[0]])
          }

        }
      })
    }

    pickerCity = Picker.picker({
      input: '#city',
      toolbarCloseText: '关闭',
      value: me.state.value ?  [me.state.value.city]: undefined,
      onChange: function (picker, values, displayValues) {
        // debugger
        var val = me.state.value
        val.city = values[0]
        me.setState({
          value: val
        })
      },
      formatValue: function (picker, values) {
          return values[0].name;
      },
      cols: [
        {
          textAlign: 'center'
        }
      ] 
    });

    if(me.state.value && me.state.value.province){
      setCityPikerValues(me.state.value.province.code, me.state.value.city);
    }

    
    var pickerProvince = Picker.picker({
        input: '#province',
        toolbarCloseText: '关闭',
        value: me.state.value ?  [me.state.value.province] : undefined,
        onChange: function (picker, values, displayValues) {
          if(!me.state.value || !me.state.value.province || values[0].code !== me.state.value.province.code){
            me.setState({
              value: {
                province : values[0]
              }
            })
          } else {
            return;
          }
          


          var provinceCode = me.state.value.province ? me.state.value.province.code: undefined
          if(!provinceCode || provinceCode===-1){
            return;
          }

          setCityPikerValues(provinceCode)
          
        },
        formatValue: function (picker, values) {
            
            return values[0].name;
        },
        cols: [
            {
                textAlign: 'center',
                values: provinces,
                displayValues: (function(){
                  var proviceNameArr = []
                  provinces.forEach(function(item){
                    proviceNameArr.push(item.name)
                  })
                  return proviceNameArr;
                })()
            }
        ]
    });

    
  }


  handleOkClick(e) {
    e.preventDefault();
    var canOk = this.state.value && this.state.value.city  && this.state.value.city.code>0;
    if(!canOk){
      return
    }
    this.props.onOk && this.props.onOk(this.state.value)
  }


  render(){
    var  canOk = this.state.value && this.state.value.city  && this.state.value.city.code>0;
    return (
        <div className="view">
          <div className="navbar">
            <div className="navbar-inner navbar-on-center">
              <div className="left sliding" >
                <a href="#" onClick={this.props.onClose} className="icon-only link"><i className="icon icon-close"></i></a>
              </div>
              <div className="center sliding">选择城市</div>
              <div className="right sliding">
                <a onClick={this.handleOkClick.bind(this)} className={classnames('ok link')} disabled={!canOk}><span>确定</span></a>
              </div>
            </div>
          </div>
          <div className="pages navbar-through">
            <div className="city-select-page page">
              <div className="page-content">
              <List style={{marginTop: 0, marginBottom: 0}}>
                <div className="item-location-select item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">省份</div>
                    <div className="item-after"> {this.state.value && this.state.value.province && this.state.value.province.code>0 ? this.state.value.province.name: '请选择'} </div>
                     <input id="province" type="text"/>
                  </div>

                </div>

                <div className="item-location-select  item-link item-content">
                  <div className="item-inner"> 
                    <div className="item-title">城市</div>
                    <div className="item-after"> {this.state.value && this.state.value.city && this.state.value.city.code>0 ? this.state.value.city.name: '请选择'} </div>
                    {this.state.value && this.state.value.province && this.state.value.province.code>0 ? <input id="city" type="text"/> : <input id="city" type="text" disabled/> }
                  </div>
                </div>
              </List>
              </div>
            </div>
          </div>
         
        </div>
    );
  }
  
}


module.exports = CitySelectView