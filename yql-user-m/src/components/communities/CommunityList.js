import React  from 'react';
import {Link} from 'react-router'
import {List} from 'react-ui/lists'
class CommunityList extends React.Component{
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
  }
  

  render(){
    return (
      <List className="media-list">
      {
        this.props.data.map( (item) => (
          
          <Link to={'/community/' + item.id} className="item-link item-content" key={item.id}>
            <div className="item-media"><img className="lazy" data-src={item.logo || require('../../resources/svg/avatar.svg')} data-autosize={false} width="44" height="44"/></div>
            <div className="item-inner">
              <div className="item-title-row">
                <div className="item-title">{item.name}</div>
                <div className="item-after">&nbsp;</div>
              </div>
              <div className="item-subtitle">{item.schame}</div>
              {
                /*<div className="item-text">{item.desc}</div>*/
              }
              
            </div>
          </Link>
        ))
      }
        
      </List>
           
    );
  }
  
}


export default CommunityList