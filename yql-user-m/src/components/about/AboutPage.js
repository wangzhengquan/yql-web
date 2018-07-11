import React  from 'react';
import $ from 'react-ui/dom'
import AnimationPage from '../Page'
import classNames from 'classnames';


class AboutPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   

  
  render(){
    return (
        <div data-page="about" className={classNames("page", this.props.className)}>

         <div className="page-content about-page">

             <div className="content-block">
                 <div className="logo">appName</div>
             </div>

             <div className="content-block my-product">
                 <div className="name">appName</div>
                 <div className="version"></div>
             </div>

             <div className="content-block contact-list">
                 <p>GitHub: BelinChung/HiApp</p>
                 <p>E-Mail: BelinChung@gmail.com</p>
                 <p>Weibo: @BelinChung</p>
             </div>

             <div className="content-block about-copyright">
                 Copyright © 2014-2015 BelinChung.
             </div>

         </div>

     </div>

    );
  }
  
}

module.exports = AboutPage
