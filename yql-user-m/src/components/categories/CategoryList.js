import React  from 'react';

require('react-ui/resources/less/lists.less');
// require('../../resources/less/product-list.less')

class CategoryList extends React.Component{
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
  }
  

  render(){
    return (
        <div className="list-block media-list">
        <ul>
          <li><a href="#" className="item-link item-content">
              <div className="item-media"><img src="http://lorempixel.com/160/160/people/1" width="80"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">Yellow Submarine</div>
                  <div className="item-after">$15</div>
                </div>
                <div className="item-subtitle">Beatles</div>
                <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
              </div></a></li>
          <li><a href="#" className="item-link item-content">
              <div className="item-media"><img src="http://lorempixel.com/160/160/people/2" width="80"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">Don't Stop Me Now</div>
                  <div className="item-after">$22</div>
                </div>
                <div className="item-subtitle">Queen</div>
                <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
              </div></a></li>
          <li><a href="#" className="item-link item-content">
              <div className="item-media"><img src="http://lorempixel.com/160/160/people/3" width="80"/></div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title">Billie Jean</div>
                  <div className="item-after">$16</div>
                </div>
                <div className="item-subtitle">Michael Jackson</div>
                <div className="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
              </div></a></li>
        </ul>
      </div>
    );
  }
  
}


export default CategoryList