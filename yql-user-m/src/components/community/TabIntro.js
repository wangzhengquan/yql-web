import React  from 'react';
import classnames from 'classnames';

class TabIntro extends React.Component{
  constructor(props) {
    super(props);
  }
  
  
  render(){
    return (
    <div id={this.props.id} className={classnames('tab', this.props.className)}>
      <div className="group-home-content">
        <div className="label-left-field">
          <span className="label">名称：</span>
          <span className="field">徒步联盟</span>
        </div>
        <div className="label-left-field">
          <span className="label">简介：</span>
          <span className="field">城市乐跑赛是由万科主办，联合城市有影响力的企事业单位参与，以快乐、健康、友谊为宗旨的非商业性、非竞技性群众体育活动。赛事要求在一个城市范围内开展，以企事业单位为载体，面向在职人群，以城市人口平均年龄为参赛标准 。</span>
        </div>

        <div className="label-left-field">
          <span className="label">微信：</span>
          <span className="field">zyzz011</span>
        </div>

        <div className="label-left-field">
          <span className="label">QQ：</span>
          <span className="field">973598066</span>
        </div>
      </div>
    </div>
    )
  }
}
export default TabIntro
