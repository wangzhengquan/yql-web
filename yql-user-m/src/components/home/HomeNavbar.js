import React  from 'react';
import ReactDOM from 'react-dom';
import SearchBar from 'react-ui/searchbar'
import { connect } from 'react-redux'
import {selectPosition} from '../../actions'
// import CategoriesPage from '../categories/CategoriesPage'
import history from '../../history'
// import SearchProductView from '../widget/SearchProductView'
require('../../resources/less/searchbar.less')

class HomeNavbar extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        position:undefined
      }
    }

    handleSelectCity(event) {
      event.preventDefault()
      var {onSelectedPosition} = this.props
      require.ensure(['../widget/CitySelectView', 'react-ui/modals'], (require) => {
        var Modals = require('react-ui/modals')
        var CitySelectView = require('../widget/CitySelectView')
        var citySelectModal = Modals.popup()
        var closeModal = (e) => {
          e.preventDefault()
          Modals.closeModal(citySelectModal)
        }
        var onOk= (position) =>{
          onSelectedPosition(position)
          this.setState({
            position
          })
          // $().trigger('ok', {value: editorArea.state.value})
          Modals.closeModal(citySelectModal)
        }
        ReactDOM.render(<CitySelectView value={this.state.position} onClose={closeModal} onOk={onOk.bind(this)}/>, citySelectModal)
      })
    }

    handleClickOpenCategoryPanel(event){
      event.preventDefault()

      require.ensure(['react-ui/panels', '../categories/CategoriesPage'], (require) => {
        var Panels = require('react-ui/panels')
        var CategoriesPage = require('../categories/CategoriesPage')
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
      })

      
    }

    handleFocus(){
      require.ensure(['../widget/SearchProductView'], (require) => {
        var SearchProductView = require('../widget/SearchProductView')
        SearchProductView.open({
          onSubmit: (value) => {
            history.push('/products?keyword='+value)
          }
        })
      })
     
    }
     
    render(){
      const {selectedPosition} = this.props
      return (
      
      <div className="navbar-inner search-navbar transparent-navbar" data-page={this.props.pageName}>
        <div className="left">
            <a className="city-select-link link" onClick={this.handleSelectCity.bind(this)}> <span>{selectedPosition.city.name}</span><i className="icon icon-arrow-down"></i></a>
        </div>

        <div className="center sliding"><SearchBar style={{padding: '0'}} onFocus={this.handleFocus.bind(this)}/></div>
        <div className="right">
          <a href="#" onClick={this.handleClickOpenCategoryPanel.bind(this)} className="open-panel link icon-only"><i className="icon icon-bars"></i></a>
        </div>
     </div>
     )

    }
}


const mapStateToProps = (state) => {
  const { selectedPosition } = state

  return {
    selectedPosition : selectedPosition || {city: {code: 0, name: '全国'} }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectedPosition: (position) => {
      dispatch(selectPosition(position))
    }
  }
}


module.exports =  connect(mapStateToProps, mapDispatchToProps)(HomeNavbar)
