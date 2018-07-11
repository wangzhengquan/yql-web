import React  from 'react';
import ReactDOM from 'react-dom'
import Navbar from 'react-ui/navbar'
import Panels from 'react-ui/panels'
import CategoriesPage from '../categories/CategoriesPage'
class ProductsNavbar extends Navbar{
  	constructor(props) {
      super(props);
    }

	handleClickOpenCategoryPanel(event){
      event.preventDefault()
      var panel = Panels.openPanel({position: 'left', className: 'layout-dark'})
      var onClose = (event) => {
        event.preventDefault()
        Panels.closePanel(panel)
      }
      var onSelect = (category_id) => {
        Panels.closePanel(panel)
        location.href = history.createHref({ pathname: '/products', query: { category_id: category_id } })
        

      }
      ReactDOM.render(<CategoriesPage onSelect={onSelect} onClose={onClose}/>, panel)
    }
    
     
    render(){
      if(this.canBack === undefined){
        this.canBack = history.canBack;
      }
      
      return (
         <div className="navbar-inner" >
            {
            this.canBack ? 
            <div className="left sliding" ><a onClick={this.handleBackClick.bind(this)} className="back link"><i className="icon icon-back" ></i><span>返回</span></a></div> : ''
            }
              
            <div className="center sliding">{this.props.title || ''}</div>

            <div className="right">
	          <a href="#" onClick={this.handleClickOpenCategoryPanel.bind(this)} className="open-panel link icon-only"><i className="icon icon-bars"></i></a>
	        </div>
          </div>
      )
    }
}

ProductsNavbar.defaultProps = {
  title: '活动列表'
}
 

module.exports = ProductsNavbar