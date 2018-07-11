import Modals from 'react-ui/modals'
import Auth from './services/Auth'
import PARAMS from './params'
import history from './history'
 

var  hideNavbar = PARAMS.hideNavbar

var breforeEnter = function({ location }, replace) {
  if(location.query.token) {
     window.localStorage.setItem('token', location.query.token)
     delete location.query.token 
     history.replace({pathname:location.pathname, query: location.query})
  }
}

const rootRoute = {
  path: '/',
  component: require('./components/View'),
  onEnter: breforeEnter,
  indexRoute: {
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isCommunityLogged(nextState, function(logged){
        if(logged){
          require.ensure(['./components/home/HomePage', './components/home/HomeNavbar'], (require) => {
            
            cb(null, {
              page: require('./components/home/HomePage'),
              navbar: hideNavbar ? null : require('./components/home/HomeNavbar')
            })
            document.querySelector('title').innerHTML='工作台'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
          
          
        }
      })
      
    }
  },

  childRoutes: [{
    path: 'pub-product',
    onEnter: breforeEnter,
    getComponent(nextState, cb) {
      Modals.showIndicator()

      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure(['./components/product/PubProductNavbar','./components/product/PubProductPage'], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/product/PubProductNavbar'),
              page: require('./components/product/PubProductPage')
            })
            document.querySelector('title').innerHTML='发布活动'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
         
          
        }
      })
      
    }
  }, {
    path: 'edit-product/:id',
    onEnter: breforeEnter,
    getComponent(nextState, cb) {
      Modals.showIndicator()

      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure(['./components/product/PubProductNavbar', './components/product/PubProductPage'], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/product/PubProductNavbar'),
              page: require('./components/product/PubProductPage')
            })
            document.querySelector('title').innerHTML='编辑活动'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
          
        }
      })
      
    }
  }, {
    path: 'recover-product/:id',
    onEnter: breforeEnter,
    getComponent(nextState, cb) {
      Modals.showIndicator()

      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure(['./components/product/PubProductNavbar', './components/product/PubProductPage'], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/product/PubProductNavbar'),
              page: require('./components/product/PubProductPage')
            })
            document.querySelector('title').innerHTML='恢复活动'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
          
        }
      })
      
    }
  }, { 
    path: 'decorate',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()

      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure(['./components/decorate/DecorateNavbar','./components/decorate/DecoratePage'], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/decorate/DecorateNavbar'),
              page: require('./components/decorate/DecoratePage')
            })
            document.querySelector('title').innerHTML='社团装修'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
          
        }
      })
      
    }
  },  { 
    path: 'products',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()

      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure(['./components/products/ProductsManageNavbar','./components/products/ProductsManagePage'], (require) => {
              cb(null, {
                navbar: require('./components/products/ProductsManageNavbar'),
                page: require('./components/products/ProductsManagePage')
              })
              document.querySelector('title').innerHTML='社团管理'
              Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
          
        }
      })

      
    }
  }, {
    path: 'login',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      require.ensure(['./components/login/LoginNavbar','./components/login/LoginPage'], (require) => {
        
        cb(null, {
          navbar: hideNavbar ? null : require('./components/login/LoginNavbar'),
          page: require('./components/login/LoginPage')
        })
        document.querySelector('title').innerHTML='登录'
        Modals.hideIndicator()
      })
    }
  }, {
    path: 'quick-login',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      require.ensure(['./components/login/QuickLoginNavbar', './components/login/QuickLoginPage'], (require) => {
          cb(null, {
            navbar: hideNavbar ? null : require('./components/login/QuickLoginNavbar'),
            page: require('./components/login/QuickLoginPage')
          })
          document.querySelector('title').innerHTML='快捷登录'
          Modals.hideIndicator()
      })
    }
  }, {
    path: 'regist',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      require.ensure([], (require) => {
          cb(null, {
            navbar: hideNavbar ? null : require('./components/regist/RegistNavbar'),
            page: require('./components/regist/RegistPage')
          })
          document.querySelector('title').innerHTML='注册社团'
          Modals.hideIndicator()
      })
    }
  },{
    path: 'retrieve-password',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      require.ensure([], (require) => {
          cb(null, {
            navbar: hideNavbar ? null : require('./components/regist/RegistNavbar'),
            page: require('./components/regist/RegistPage')
          })
          document.querySelector('title').innerHTML='找回密码'
          Modals.hideIndicator()
      })
    }
  }, {
    path: 'regist-community-info',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      
      require.ensure([], (require) => {
        cb(null, {
          navbar: hideNavbar ? null : require('./components/regist/RegistCommunityInfoNavbar'),
          page: require('./components/regist/RegistCommunityInfoPage')
        })
        document.querySelector('title').innerHTML='填写社团信息'
        Modals.hideIndicator()
      })
    }
  }, {
    path: 'me',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/me/MeNavbar'),
              page: require('./components/me/MePage')
            })
            document.querySelector('title').innerHTML='基本信息设置'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
          
        }
      
      })
    }
  }, {
    path: ':productId/orders',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/orders/OrdersNavbar'),
              page: require('./components/orders/OrdersPage')
            })
            document.querySelector('title').innerHTML='报名列表'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
        }
      
      })
    }
  }, {
    path: 'order/:id',
    onEnter: breforeEnter,
    getComponents(nextState, cb) {
      Modals.showIndicator()
      Auth.isCommunityLogged(function(logged){
        if(logged){
          require.ensure([], (require) => {
            cb(null, {
              navbar: hideNavbar ? null : require('./components/order/OrderNavbar'),
              page: require('./components/order/OrderPage')
            })
            document.querySelector('title').innerHTML='报名详情'
            Modals.hideIndicator()
          })
        } else {
          Modals.hideIndicator()
          window.sessionStorage.setItem('nextPath', nextState.location.pathname)
          history.replace('/login')
        }
      })
    }
  }]

}

export default rootRoute;