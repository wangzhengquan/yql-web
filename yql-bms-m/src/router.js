import Modals from 'react-ui/modals'
import Auth from './services/Auth'
/**
 * 是否是微信
 */
var isWeiXin = () => {
  return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) === 'micromessenger'
}

var  hideNavbar = isWeiXin()

const rootRoute = {
  path: '/',
  component: require('./components/View'),
  indexRoute: {
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isLogged(nextState, function(logged){
        if(logged){
          require.ensure(['./components/home/HomePage', './components/home/HomeNavbar'], (require) => {
            
            cb(null, {
              page: require('./components/home/HomePage'),
              navbar: require('./components/home/HomeNavbar')
            })
            document.querySelector('title').innerHTML='工作台'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.location.href = '/login'
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          
        }
      })
    }
  },

  childRoutes: [{
    path: 'decorate-home',
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isLogged(nextState, function(logged){
        if(logged){
          require.ensure([], (require) => {
              cb(null, {
                navbar: hideNavbar ? null : require('./components/columns/DecorateHomeNavbar'),
                page: require('./components/columns/DecorateHomePage')
              })
              document.querySelector('title').innerHTML='装修首页'
              Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.location.href = '/login'
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          
        }
      })
      
    }
  }, {
    path: 'categories',
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isLogged(nextState, function(logged){
        if(logged){
          require.ensure([], (require) => {
              cb(null, {
                navbar: hideNavbar ? null : require('./components/categories/CategoriesNavbar'),
                page: require('./components/categories/CategoriesPage')
              })
              document.querySelector('title').innerHTML='类别管理'
              Modals.hideIndicator()
          })
         } else {
          Modals.hideIndicator()
          window.location.href = '/login'
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          
        }
      }) 
      
    }
  },  {
    path: 'bms-users',
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isLogged(nextState, function(logged){
        if(logged){
          require.ensure([], (require) => {
              cb(null, {
                navbar: hideNavbar ? null : require('./components/bms-users/BmsUsersNavbar'),
                page: require('./components/bms-users/BmsUsersPage')
              })
              document.querySelector('title').innerHTML='类别管理'
              Modals.hideIndicator()
          })

        } else {
          Modals.hideIndicator()
          window.location.href = '/login'
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          
        }
      })
      
    }
  }, {
    path: 'login',
    getComponents(nextState, cb) {
      Modals.showIndicator()
      require.ensure([], (require) => {
          cb(null, {
            navbar: hideNavbar ? null : require('./components/login/LoginNavbar'),
            page: require('./components/login/LoginPage')
          })
          document.querySelector('title').innerHTML='登录'
          Modals.hideIndicator()
      })
    }
  },  {
    path: 'resetpassword',
    getComponents(nextState, cb) {
      Modals.showIndicator()
       Auth.isLogged(nextState, function(logged){
        if(logged){
          require.ensure([], (require) => {
              cb(null, {
                navbar: hideNavbar ? null : require('./components/resetpassword/ResetPasswordNavbar'),
                page: require('./components/resetpassword/ResetPasswordPage')
              })
              document.querySelector('title').innerHTML='密码重置'
              Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.location.href = '/login'
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
        }
      })
    }
  }]

}

export default rootRoute;
