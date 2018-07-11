import React  from 'react'
import classNames from 'classnames';
import Ajax from '../../ajax'
require('react-ui/resources/less/lists.less')
require('react-ui/resources/less/content-block.less')

class CategoriesPage extends React.Component{
  

  constructor(props) {
    super(props);
    this.data = null;
    this.state = {
      data: this.data
    }
    Ajax.ajax({
      url: '/categories'
    }).then(([json]) => {
      if(!json.error){
        this.data = json.data;
        this.setState({
          data: this.data
        })
      }
    })
  }


  render(){
    return (
    <div className={classNames('page', this.props.className)}>
      <div className="content-block-title">类目</div>
       
      <div className="list-block">
        <ul>
        {
        this.state.data ? this.state.data.map((item) => (
          <li key={item.id}>
            <a onClick={() => this.props.onSelect && this.props.onSelect(item.id)} className="item-link close-panel">
              <div className="item-content">
              {
                /*
                <div className="item-media"><i className="icon icon-yql"></i></div>
                */
              }
                
                <div className="item-inner">
                  <div className="item-title">{item.name}</div>
                </div>
              </div>
            </a>
          </li>
        )): ''
      }
        </ul>
      </div>
      
    </div>
    )
  }
}

module.exports = CategoriesPage