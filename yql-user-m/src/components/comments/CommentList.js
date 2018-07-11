import React  from 'react';
// import {Link} from 'react-router'
// import $ from 'react-ui/dom'
// import AnimationPage from '../Page'
// import classnames from 'classnames';
// import {List} from 'react-ui/lists'
require('../../resources/less/comment-list.less')

class CommentList extends React.Component{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
  }
  
  render(){
  	return (
  	<div className="comment-list comment-content">
      <div className="comment-item">
        <div className="comment-header">林志玲</div>
        <div className="comment-content">
          <div className="comment-content-inner">非常愉快的体验，棒极了，姐姐分析的挺透彻得，一下就能说到我的心坎里，我自己会静静的思考一段时间，接下来该如何处理</div>
          <div className="comment-content-inner">
            <div className="img-content">
              <ul className="imgs">
                <li><a><img src="//img.alicdn.com/bao/uploaded/i2/181680233336000451/TB24zeKqXXXXXa9XXXXXXXXXXXX_!!0-rate.jpg_100x100q75.jpg" /></a></li>
                <li><a><img src="//img.alicdn.com/bao/uploaded/i4/181680233336009358/TB2VZWuqXXXXXXuXpXXXXXXXXXX_!!0-rate.jpg_100x100q75.jpg" /></a></li>
                <li><a><img src="//img.alicdn.com/bao/uploaded/i1/181680233336023287/TB2QiaFqXXXXXbEXXXXXXXXXXXX_!!0-rate.jpg_100x100q75.jpg" /></a></li>
                <li><a><img src="//img.alicdn.com/bao/uploaded/i4/181680233336056617/TB2QVeWqXXXXXXCXXXXXXXXXXXX_!!0-rate.jpg_100x100q75.jpg" /></a></li>
                <li><a><img src="//img.alicdn.com/bao/uploaded/i3/181680233336075556/TB2spuCqXXXXXclXXXXXXXXXXXX_!!0-rate.jpg_100x100q75.jpg" /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="comment-footer"><i>2016.05.27</i> <i>春季郊游</i></div>
      </div>

      <div className="comment-item">
        <div className="comment-header">林志玲</div>
        <div className="comment-content">
          <div className="comment-content-inner">非常愉快的体验，棒极了，姐姐分析的挺透彻得，一下就能说到我的心坎里，我自己会静静的思考一段时间，接下来该如何处理</div>
        </div>
        <div className="comment-footer"><i>2016.05.27</i> <i>春季郊游</i></div>
      </div>

    </div>
  	)
  }
}
export default CommentList
