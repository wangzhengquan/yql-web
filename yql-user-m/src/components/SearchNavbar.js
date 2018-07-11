import React  from 'react';
import ReactDOM from 'react-dom';
import SearchBar from 'react-ui/searchbar'

import Panels from 'react-ui/panels'
import CategoriesPage from './categories/CategoriesPage'
import history from './history'
import SearchProductView from './widget/SearchProductView'
require('../resources/less/searchbar.less')

class SearchNavbar extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        position:undefined
      }
    }

    

    handleClickOpenCategoryPanel(event){
      event.preventDefault()
      var panel = Panels.openPanel({position: 'left', className: 'layout-dark'})
      var onClose = (event) => {
        event.preventDefault()
        Panels.closePanel(panel)
      }
      var onSelect = (catId) => {
        Panels.closePanel(panel)
        history.push('/products?categoryId='+catId)
      }
      ReactDOM.render(<CategoriesPage onSelect={onSelect} onClose={onClose}/>, panel)
    }

    handleFocus(){
     SearchProductView.open()
    }
     
    render(){
      return (
      
      <div className="navbar-inner search-navbar transparent-navbar" data-page={this.props.pageName}>
        <div className="left">
            <a className="city-select-link link"> <span>全国</span><i className="icon icon-arrow-down"></i></a>
        </div>

        <div className="center sliding"><SearchBar style={{padding: '0'}} onFocus={this.handleFocus.bind(this)}/></div>
        <div className="right">
          <a href="#" onClick={this.handleClickOpenCategoryPanel.bind(this)} className="open-panel link icon-only"><i className="icon icon-bars"></i></a>
        </div>
     </div>
     )

    }
}

 

module.exports = SearchNavbar