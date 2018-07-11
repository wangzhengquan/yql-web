import React  from 'react';
import ReactDOM from 'react-dom';
import {List} from 'react-ui/lists'
import Views from 'react-ui/views'
// import Location from './Location'
import SearchBar from 'react-ui/searchbar'
// import LocationAutoComplateList from './LocationAutoComplateList'
import Timer from 'react-ui/timer'
import Navbar from 'react-ui/navbar'
import $ from 'react-ui/dom'
import Modals from 'react-ui/modals'

require('../../resources/less/map-view.less')

const limit = 20;

 class Location extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        reachLastOne: false,
        nearAddressList: undefined,
        searchedAddressList: undefined
      }
      this.destroyList = []
      this.poi = {}
      this.pageIndex  = 0;
      this.searching = false;
    }

    componentDidMount(){
      var me = this;

      //初始化地图对象，加载地图
      //初始化加载地图时，若center及level属性缺省，地图默认显示用户当前城市范围
      var map = this.map = new AMap.Map('map-view', {
        resizeEnable: true,
        zoom:13
        //center: [116.397428, 39.90923]
      });


       //地图中添加地图操作ToolBar插件
      map.plugin(['AMap.ToolBar'], function() {
          //设置地位标记为自定义标记
          var toolBar = new AMap.ToolBar();
          map.addControl(toolBar);
      });

      // //周边检索
      AMap.service(['AMap.PlaceSearch'], function() {
          me.placeSearch = new AMap.PlaceSearch({ //构造地点查询类
              pageSize: limit
             // type: '小区'
              //pageIndex: pageIndex,
             //city: "010", //城市
              //map: map
          });
      });

      AMap.service('AMap.Geocoder',function(){//回调函数
          //实例化Geocoder
          me.geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          });
      })

      AMap.plugin(['AMap.Autocomplete'],function(){
        me.autocomplete= new AMap.Autocomplete({});
      });


      var addCurMarker = function(cur){
        var marker = new AMap.Marker({
            position: cur,
            draggable: false,
            cursor: 'move'
        });
        marker.setMap(map);
        // 设置点标记的动画效果，此处为弹跳效果
        marker.setAnimation('AMAP_ANIMATION_BOUNCE');
      }
      

      var init = function(){
        map.on('moveend', function(e){
          Modals.showIndicator()
          me.pageIndex = 0;
          me.searchNear('', map.getCenter(), function(){
            Modals.hideIndicator()
          })
        });

        // var infiniteScroll = new InfiniteScroll({infiniteContent: me.refs.nearAddressListContent, distance: 50})
        // me.destroyList.push(function(){
        //   infiniteScroll.destroy()
        // })

        
        // infiniteScroll.on('infinite', () => {
        //   if (me.searching) return;
        //   me.searching = true;
        //   me.searchNear( () => {
        //     me.searching = false
        //   })
        // })

      }


      Modals.showIndicator()

      var getCurPosTimer = window.setTimeout(() => {
        me.pageIndex = 0;
        this.searchNear('', map.getCenter(), function(){
          Modals.hideIndicator()
          init()
        })
      }, 10000)

      navigator.geolocation.getCurrentPosition( (position) => {
        // console.log("=====getCurrentPosition===", position)
        window.clearTimeout(getCurPosTimer)
        var point = [position.coords.longitude, position.coords.latitude]
        map.panTo(point);
        addCurMarker(point);

        me.pageIndex = 0;
        me.searchNear('', {lng: point[0], lat: point[1]}, function(){
          Modals.hideIndicator()
          init()
        })
      }, function(error){
        // console.error('=====getCurrentPosition error===', error)
      });

      

    }

    searchNear (key, point, cb) {
      if (this.searching) return;
      this.searching = true;
      var me = this;
      if(this.pageIndex === 0){
        this.setState({
          reachLastOne: false,
          nearAddressList: undefined
        })
        
      }
      if(typeof key === 'function'){
        cb = key
        
        key = ''
      }
      if(point)
        this.poi.location = point
      else{
        point = this.poi.location;
      }
      this.placeSearch.setPageIndex(++this.pageIndex)
      this.placeSearch.searchNearBy(key, [point.lng, point.lat], 500, (status, result) => {
          me.searching = false;
          if(status === 'complete'){
            var nearAddressList = me.state.nearAddressList || []
            nearAddressList = nearAddressList.concat(result.poiList.pois);
            me.setState({
              nearAddressList: nearAddressList
            })
            if(result.poiList.pois.length < limit){
              me.setState({
                reachLastOne: true
              })
            }
          } else if(status === 'no_data'){
            me.setState({
              reachLastOne: true
            })
          }
          cb && cb();
      });
    }

    search (key, cb) {
       this.placeSearch.search(key, cb);
    }


    goTo (location){
      this.map.panTo(location);
      this.pageIndex = 0;
      this.searchNear('', location)
    }

     
    onSelect(poi, event) {
      event.preventDefault();
      // console.log("==onSelect==", poi)
      this.geocoder.getAddress([poi.location.lng, poi.location.lat], (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            poi.city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
            this.props.onSelect && this.props.onSelect(poi)
          } else {
            window.alert('error geocoder.getAddress '+result)
          }
      });
      
    }
     
    render(){
      return  (
        <span>
          <div className="map-body">
            <div id="map-view" ></div>
            <div className="marker-static"></div>
          </div>
           
          <div className="near-adress-list-content" ref="nearAddressListContent">
             <List className="media-list near-address-list">
              {
                this.state.nearAddressList ? this.state.nearAddressList.map((item, i, list) => (
                  <a href="#" key={(list.length-limit+i)+'-nearAddresKey'} className="item-content item-address" onClick={this.onSelect.bind(this, item)}>
                    <div className="item-media"><img src="http://m.amap.com/picker/images/poi_icon.png" width="14"/></div>
                    <div className="item-inner">
                      <div className="item-title-row">
                        <div className="item-title">{item.name}</div>
                      </div>
                      <div className="item-text">{item.address}</div>
                    </div>
                  </a>
                )) : ''
              }
               
             </List>
            {/*(!this.state.nearAddressList || this.state.reachLastOne) ? '' : <InfiniteScrollPreloader/>*/}
          </div>
        </span>
      )
    }
}

class LocationAutoComplateList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data || []
    }
  }
   
  componentDidMount(){
  }

  
  render(){
    return (
     <List className="address-list media-list">
     {
      (this.state.data && this.state.data.length > 0) ? this.state.data.map((item, index) => (
        <a href="#" className="item-content item-address" key={index} onClick={ (event) => {
          event.preventDefault();
          this.props.onSelect && this.props.onSelect(item)
        }}>
          <div className="item-inner">
          <div className="item-title-row">
            <div className="item-title">{item.name}</div>
          </div>
          <div className="item-text">{item.district || item.address}</div>
          </div>
        </a>
      )) : ''
     }
        
     </List>
    )
  }
}

var mapview = {
  open () {
    window.mainView = window.mainView || Views.addView('.view-main', {
        // Enable Dynamic Navbar for this view
        dynamicNavbar: true
    });
    let res = window.mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner navbar-location">' +
        '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i></a></div>' +
        '    <div class="center sliding"></div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div class="page  navbar-through">' +
        '   <div class="page-content"></div>' +
        '   <div class="page-content panel-address-autocomplete" style="display: none;" ></div>' +
        '  </div>' +
        '</div>'
    );
    var pageContents = res[1].querySelectorAll('.page-content');

    var onSelect = (poi) => {
      // this.fire('select', poi)
      $(res[1]).trigger('select', {value: poi})
      window.mainView.back()
    }
    var location = ReactDOM.render(<Location onSelect={onSelect}/>, pageContents[0])
    var addressAutocompletePanel = pageContents[1];
    var autoComplateList = ReactDOM.render(<LocationAutoComplateList  onSelect={onSelect}/>, pageContents[1])
    var autocomplete = location.placeSearch;
    //搜索地址
    var onSearch = Timer.bufferUnless(function(value){
      if(!value || value === ''){
        return;
      }
      autocomplete.search(value,  (status, result) => {
        if(status === 'complete'){
          if(addressAutocompletePanel.style.display === 'none') addressAutocompletePanel.style.display = 'block'
          autoComplateList.setState({
            data: result.poiList.pois
          })
        }
      });
    }, 500, this)

    var onCancel = function() {
      addressAutocompletePanel.style.display = 'none';
    }

    ReactDOM.render(<SearchBar onChange={onSearch} onSubmit={onSearch} onCancel={onCancel} cancelButton={true} overlay={true} />, res[0].querySelector('.center'))

    Navbar.sizeNavbar(res[0])
    return res;
  }
}
export default mapview;
