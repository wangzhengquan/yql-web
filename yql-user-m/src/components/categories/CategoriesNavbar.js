import React  from 'react';
class SettingNavbar extends React.Component{
  

    constructor(props) {
      super(props);
    }
    
    render(){
      return (
        <div className="navbar-inner navbar-on-center">
          <div className="left sliding" ><a href="index.html" className="back link"><i className="icon icon-back" ></i><span>Back</span></a></div>
          <div className="center sliding">Media Lists</div>
          <div className="right"><a href="#" className="open-panel link icon-only"><i className="icon icon-bars"></i></a></div>
        </div>
      );
    }
}

module.exports = SettingNavbar