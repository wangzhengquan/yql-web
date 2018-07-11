import Modals from 'react-ui/modals'
import Auth from './services/Auth'
import history from './history'
// import MicroEvent from 'react-ui/microevent'
/**
 * 是否是微信
 */
var isWeiXin = () => (
  navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
)
var  hideNavbar = isWeiXin()

var breforeEnter = function({ location }, replace) {
  if(location.query.token) {
     window.localStorage.setItem('token', location.query.token)
     delete location.query.token 
     history.replace({pathname:location.pathname, query: location.query})
  }
}

const rootRoute = {
    childRoutes: [{
        path: '/',
        onEnter: breforeEnter,
        component: require('./components/View'),
        indexRoute: {
          getComponents(nextState, cb) {
            
            Modals.showIndicator()
            require.ensure(['./components/home/HomePage', './components/Tabbar'], (require) => {
              
              cb(null, {
                navbar: require('./components/home/HomeNavbar'),
                page: require('./components/home/HomePage'),
                toolbar: require('./components/Tabbar')
              })
              document.querySelector('title').innerHTML='好聚友'
              Modals.hideIndicator()
            })
          }
        },

        childRoutes: [{
          path: 'communities',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? undefined : require('./components/communities/CommunitiesNavbar'),
                  page: require('./components/communities/CommunitiesPage'),
                  toolbar: require('./components/Tabbar')
                })
                document.querySelector('title').innerHTML='社团'
                Modals.hideIndicator()
            })
          }
        }, {
          path: 'products',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/products/ProductsNavbar'),
                  page: require('./components/products/ProductsPage')
                })
                document.querySelector('title').innerHTML='活动列表'
                Modals.hideIndicator()
            })
          }
            
        }, {
          path: 'community/:id',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/community/CommunityNavbar'),
                  page: require('./components/community/CommunityPage')
                })
                document.querySelector('title').innerHTML='社团详情'
                Modals.hideIndicator()
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
            require.ensure([], (require) => {
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
                document.querySelector('title').innerHTML='注册帐号'
                Modals.hideIndicator()
            })
          }
        }, {
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
          path: 'my',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            Auth.isCommunityLogged(function(logged){
              if(logged){
                require.ensure([], (require) => {
                    cb(null, {
                      navbar: hideNavbar ? null : require('./components/my/MyNavbar'),
                      page: require('./components/my/MyPage'),
                      toolbar: require('./components/Tabbar')
                    })
                    document.querySelector('title').innerHTML='我的'
                    Modals.hideIndicator()
                })
              } else {
                Modals.hideIndicator()
                window.sessionStorage.setItem('nextPath',  nextState.location.pathname+nextState.location.search)
                history.replace('/login')
              }
            })
            
          }
        },  {
          path: 'me',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            Auth.isLogged(function(logged){
              if(logged){
                require.ensure([], (require) => {
                    cb(null, {
                      navbar: hideNavbar ? null : require('./components/me/MeNavbar'),
                      page: require('./components/me/MePage')
                    })
                    document.querySelector('title').innerHTML='个人信息'
                    Modals.hideIndicator()
                })
              } else {
                Modals.hideIndicator()
                window.sessionStorage.setItem('nextPath',  nextState.location.pathname+nextState.location.search)
                history.replace('/login') 
                
              }
            })
            
          }
        }, {
          path: 'orders',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            Auth.isLogged(function(logged){
              if(logged){
                require.ensure([], (require) => {
                    cb(null, {
                      navbar: hideNavbar ? null : require('./components/orders/OrdersNavbar'),
                      page: require('./components/orders/OrdersPage')
                    })
                    document.querySelector('title').innerHTML='我报名的活动'
                    Modals.hideIndicator()
                })
              } else {
                Modals.hideIndicator()
                window.sessionStorage.setItem('nextPath',  nextState.location.pathname+nextState.location.search)
                history.replace('/login') 
                
              }
            })
            
          }
        }, {
          path: 'order-confirm',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            Auth.isLogged(function(logged){

              if(logged){
                var user = Auth.getUser()
                if(!user.realname || !user.birthday || !user.sex){
                  Modals.hideIndicator()
                  window.sessionStorage.setItem('nextPath',  nextState.location.pathname+nextState.location.search)
                  history.replace('/type-apply-info')
                } else {
                  require.ensure([], (require) => {
                      cb(null, {
                        navbar: hideNavbar ? null : require('./components/order/OrderConfirmNavbar'),
                        page: require('./components/order/OrderConfirmPage')
                      })
                      document.querySelector('title').innerHTML='报名确认'
                      Modals.hideIndicator()
                  })
                }
                
              } else {
                Modals.hideIndicator()
                window.sessionStorage.setItem('nextPath',  nextState.location.pathname+nextState.location.search)
                history.replace('/login')
                
              }
            })
            
          }
        }, {
          path: 'order/:id',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            Auth.isLogged(function(logged){

              if(logged){
                require.ensure([], (require) => {
                    cb(null, {
                      navbar: hideNavbar ? null : require('./components/order/OrderNavbar'),
                      page: require('./components/order/OrderPage')
                    })
                    document.querySelector('title').innerHTML='报名确认'
                    Modals.hideIndicator()
                })
                
              } else {
                Modals.hideIndicator()
                window.sessionStorage.setItem('nextPath',  nextState.location.pathname+nextState.location.search)
                history.replace('/login')
                
              }
            })
            
          }
        },  {
          path: 'type-apply-info',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            Auth.isLogged(function(logged){
              if(logged){
                require.ensure([], (require) => {
                    cb(null, {
                      navbar: hideNavbar ? null : require('./components/apply/TypeApplyInfoNavbar'),
                      page: require('./components/apply/TypeApplyInfoPage')
                    })
                    document.querySelector('title').innerHTML='填写报名信息'
                    Modals.hideIndicator()
                })
              } else {
                Modals.hideIndicator()
                window.sessionStorage.setItem('nextPath',  nextState.location.pathname+nextState.location.search)
                history.replace('/login')
                
              }
            })
            
          }
        }, {
          path: 'about',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/about/AboutNavbar'),
                  page: require('./components/about/AboutPage')
                })
                document.querySelector('title').innerHTML='关于我们'
                Modals.hideIndicator()
            })
          }
        }, {
          path: 'product/:id',
          onEnter: breforeEnter,
          getComponent(nextState, cb) {
            Modals.showIndicator()
            //只为获取登录信息，无伦是否登录都可以进入该页面
            require.ensure([], (require) => {
              cb(null, {
                navbar: hideNavbar ? null : require('./components/product/ProductNavbar'),
                page: require('./components/product/ProductPage')
              })
              document.querySelector('title').innerHTML='活动详情'
              Modals.hideIndicator()
            })
          }
        }, {
          path: 'test',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            require.ensure([], (require) => {
                cb(null, {
                  navbar: hideNavbar ? null : require('./components/test/TestNavbar'),
                  page: require('./components/test/TestPage')
                })
                document.querySelector('title').innerHTML='Test'
                Modals.hideIndicator()
            })
          }
        }]
    }]
    
}



// MicroEvent.mixin(rootRoute)
// rootRoute.on('beforeEnter', function(nextState){
//   // history.createPath({ pathname: '/the/path', query: { the: 'query' } })
//   // history.push({ pathname: '/the/path', query: { the: 'query' } ,state: { some: 'state' }})
//   if(nextState.location.query.token) {

//      window.localStorage.setItem('token', (nextState.location.query.token))
//      delete nextState.location.query.token 
//      history.replace({pathname:nextState.location.pathname, query: nextState.location.query})
//   }
//   // console.log('nextState', nextState)
// })


export default rootRoute;