import React  from 'react';
import Page from '../Page'
import CommunityList from './CommunityList'
import LazyLoad from 'react-ui/lazy-load'
import Ajax from '../../ajax'
import {InfiniteScroll, InfiniteScrollPreloader} from 'react-ui/infinite-scroll'
import SearchBar from 'react-ui/searchbar'
import classNames from 'classnames'

require('../../resources/less/communities-page.less')
var limit = 20;

class CommunitiesPage extends Page{
  constructor(props) {
    super(props);
    this.state = {
      loadFinished: false,
      data:[]
      //data: [{"img_url":"upload/20160510/3f516485ca0149c5877c4563023eacc0.jpg","jump_type":"1","simple_address":"","limit_nums":null,"product_id":"88e73c0b3ac0429e905c49fcb7ea6677","tag":"英语口语","apply_nums":null,"head_photo_url":"upload/20160510/98b68e10edcc4ee58b249b16d2b055a3.png","type":"2","jump_address":"","nick_modify":"Johnnie","id":434,"title":"国外小鲜肉带你分分钟玩转生活口语","market_price":860.0,"zhima_price":430.0,"subtitle":"深入的对话让你口语升级！这个课程超越&ldquo;生存口语&rdquo;的层次，深入到英美社会生活的细微之处，与一般的口语课程比较，有更广泛的交流话题、更丰富的表达方式、更浓厚的交谈趣味，能全面提高学习者的口语水平。精通3国语言小鲜肉，上课轻松幽默，并且中文一级棒沟通绝对无障碍。"},{"img_url":"upload/20160425/2f20db92e25b4b818dee1db03ef10809.jpg","jump_type":"1","simple_address":"","limit_nums":null,"product_id":"04ecef0b957d43eea2db3a22ac3c7a42","tag":"定制摄影","apply_nums":null,"head_photo_url":"upload/20150730/43ecf95732e54d9ba495fbf313247a8f.png","type":"2","jump_address":"","nick_modify":"拾光影社","id":430,"title":"你身边最好的私人定制摄影师","market_price":1500.0,"zhima_price":600.0,"subtitle":"去做想做的事.趁阳光正好.趁微风不噪.趁繁花还未开至荼蘼.趁你还年轻.趁梦想还未   老.\t或记不起曾经的模样，但此时我依然美丽，\t可以不自信，也可以不浓妆，只为将来遇见自己年轻的模样。我是你的私人摄影师，拿出2小时，与自己邂逅。"},{"img_url":"upload/20160506/69e6e3d9b8e942498737a17950f3b7a3.jpg","jump_type":"1","simple_address":"","limit_nums":null,"product_id":"fbb46d553bb34a4e8ae1ac7e7a0839ab","tag":"定制简历","apply_nums":null,"head_photo_url":"upload/20160507/7c722411a7884947a781ec27fa9f9802.jpg","type":"2","jump_address":"","nick_modify":"Lawrence","id":433,"title":"【求职季】让面试官从简历开始选择你","market_price":300.0,"zhima_price":188.0,"subtitle":"为什么投了那么多简历都石沉大海？ 如何让自己的建立在众多应聘者中脱颖而出？ 如何在没有较好工作背景下进入百强公司？ 毕业季=求职季 你难道还没意识到简历的重要性？高颜值专家为你定制精品简历，让面试官从简历开始选择你！"},{"img_url":"upload/20160425/438509435d7449c39c308d45c37932a4.jpg","jump_type":"1","simple_address":"","limit_nums":null,"product_id":"f40a6e64b4c142ee898126d2bfb95a9d","tag":"宠物美容上门","apply_nums":null,"head_photo_url":"upload/20160309/71e623af8f7345a48063e5b9fb2cb213.jpeg","type":"2","jump_address":"","nick_modify":"宠物美容师旺仔","id":429,"title":"喵星汪星人正确打开方式 主人你都知晓吗？","market_price":200.0,"zhima_price":160.0,"subtitle":"让您足不出户就能给毛孩子做洗澡美容等项目.节省您的时间和精力。避免了毛孩子在宠物店里细菌交叉感染的风险，缓解了狗狗惧怕洗澡的紧张情绪，并且能及时解答您在养宠过程中的任何疑问。"},{"img_url":"upload/20160425/98a9f8f55a9e437d8c50c00e941f4dc7.jpg","jump_type":"1","simple_address":"","limit_nums":null,"product_id":"3a7c6efe92194f28ae1f83d444f7f215","tag":"线上解析","apply_nums":null,"head_photo_url":"upload/20160429/b237c4842320423ca4868bf61c25bcb2.png","type":"2","jump_address":"3a7c6efe92194f28ae1f83d444f7f215","nick_modify":"璎珞幽蓝","id":428,"title":"情感解析指导","market_price":100.0,"zhima_price":100.0,"subtitle":"大家好，我是璎珞，来自上海的情感解析师，同时也是一位名企职业经理人。我在这里，和大家一起剖析你的情感历程，人际关系，教会你如何高情商的面对情感，把握爱情。帮你摆脱一切旧有模式带来的困惑，抑郁和痛苦。和你一起寻回内心那个光芒的自己。"}]
    }

  }

  query(param, cb) {
    Ajax.ajax({
      url: '/communities',
      data: param,
      success:  (json) => {
        var data = json.data;
        if(data.length<limit){
          this.setState({
            reachLastOne: true
          })
        }
        cb && cb(data)
        
      }
    })
  }

  loadFist(cb){
    this.setState({
      reachLastOne: false
    })

    this.param.start = 0;
    this.param.limit = 20;
    this.query(this.param, (data)=> {
      this.setState({
        data: data
      })
      cb && cb()
    })
  }

  loadMore(cb){
    this.param.start += limit
    this.query(this.param, (data)=> {
      this.setState({
        data: this.state.data.concat(data)
      })

      cb && cb()
    })
  }

  componentDidMount(){
    super.componentDidMount()
    this.init()
  }

  init(){
    this.param = this.props.location.query
    this.loadFist(() => {
      var lazyload = new LazyLoad({scrollContainer: this.refs.pageContent, placeholder: false})
      this.destroyList.push(() => {lazyload.destroy()})

      var infiniteScroll = new InfiniteScroll({infiniteContent: this.refs.pageContent, distance: 50})
      this.destroyList.push(function(){
        infiniteScroll.destroy()
      })
      var loading = false;
      infiniteScroll.on('infinite', () => {
        if (loading || this.state.reachLastOne) return;
        loading = true;

        this.loadMore(() => {
          loading = false
        })
      })
    })

    
  }

  handleSearch(val){
    this.param = {
      keyword: val
    }
    this.loadFist()
  }

  handleClear(){
    
  }

  handleChange(value){
    if(value === ''){
      this.param = {}
      this.loadFist()
    }
  }

  render(){
    return (
      <div className={classNames('page groups-page', this.props.className)}>
        <SearchBar onSubmit={this.handleSearch.bind(this)} onClear={this.handleClear.bind(this)} onChange={this.handleChange.bind(this)}/>
        <div className="page-content" ref="pageContent">
          <CommunityList data={this.state.data} style={{marginBottom: 0}}/>
          {this.state.reachLastOne ? '' : <InfiniteScrollPreloader/>}

        </div>
      </div>
    );
  }
  
}

module.exports = CommunitiesPage
