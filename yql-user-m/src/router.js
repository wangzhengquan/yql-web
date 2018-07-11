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
            Promise.all([
              import('./components/home/HomeNavbar'),
              import('./components/home/HomePage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, Tabbar]) => {
              cb(null, {
                navbar: navbar,
                page: page,
                toolbar: Tabbar
              })
              document.querySelector('title').innerHTML='一起嗨'
              Modals.hideIndicator()
            })
          }
        },

        childRoutes: [{
          path: 'communities',
          onEnter: breforeEnter,
          getComponents(nextState, cb) {
            Modals.showIndicator()
            Promise.all([
              import('./components/communities/CommunitiesNavbar'),
              import('./components/communities/CommunitiesPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
              cb(null, {
                navbar:  hideNavbar ? undefined : navbar,
                page: page,
                toolbar: tabbar
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
            Promise.all([
              import('./components/products/ProductsNavbar'),
              import('./components/products/ProductsPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
                cb(null, {
                  navbar: hideNavbar ? null :navbar,
                  page: page
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
            Promise.all([
              import('./components/community/CommunityNavbar'),
              import('./components/community/CommunityPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
                cb(null, {
                  navbar: hideNavbar ? null : navbar,
                  page: page
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
            Promise.all([
              import('./components/login/LoginNavbar'),
              import('./components/login/LoginPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
              
              cb(null, {
                navbar: hideNavbar ? null : navbar,
                page: page
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
            Promise.all([
              import('./components/login/QuickLoginNavbar'),
              import('./components/login/QuickLoginPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
                cb(null, {
                  navbar: hideNavbar ? null : navbar,
                  page: page
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
            Promise.all([
              import('./components/regist/RegistNavbar'),
              import('./components/regist/RegistPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
                cb(null, {
                  navbar: hideNavbar ? null : navbar,
                  page: page
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
            Promise.all([
              import('./components/regist/RegistNavbar'),
              import('./components/regist/RegistPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
                cb(null, {
                  navbar: hideNavbar ? null : navbar,
                  page: page
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
                Promise.all([
                  import('./components/my/MyNavbar'),
                  import('./components/my/MyPage'),
                  import('./components/Tabbar')
                  
                ]).then( ([navbar, page, tabbar]) => {
                    cb(null, {
                      navbar: hideNavbar ? null : navbar,
                      page: page,
                      toolbar: tabbar
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
                Promise.all([
                  import('./components/me/MeNavbar'),
                  import('./components/me/MePage'),
                  import('./components/Tabbar')
                  
                ]).then( ([navbar, page, tabbar]) => {
                    cb(null, {
                      navbar: hideNavbar ? null : navbar,
                      page: page
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
                Promise.all([
                  import('./components/orders/OrdersNavbar'),
                  import('./components/orders/OrdersPage'),
                  import('./components/Tabbar')
                  
                ]).then( ([navbar, page, tabbar]) => {
                    cb(null, {
                      navbar: hideNavbar ? null : navbar,
                      page: page
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
                  Promise.all([
                    import('./components/order/OrderConfirmNavbar'),
                    import('./components/order/OrderConfirmPage'),
                    import('./components/Tabbar')
                    
                  ]).then( ([navbar, page, tabbar]) => {
                      cb(null, {
                        navbar: hideNavbar ? null : navbar,
                        page: page
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
                Promise.all([
                  import('./components/order/OrderNavbar'),
                  import('./components/order/OrderPage'),
                  import('./components/Tabbar')
                  
                ]).then( ([navbar, page, tabbar]) => {
                    cb(null, {
                      navbar: hideNavbar ? null : navbar,
                      page: page
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
                Promise.all([
                  import('./components/apply/TypeApplyInfoNavbar'),
                  import('./components/apply/TypeApplyInfoPage'),
                  import('./components/Tabbar')
                  
                ]).then( ([navbar, page, tabbar]) => {
                    cb(null, {
                      navbar: hideNavbar ? null : navbar,
                      page: page
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
            Promise.all([
              import('./components/about/AboutNavbar'),
              import('./components/about/AboutPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
                cb(null, {
                  navbar: hideNavbar ? null : navbar,
                  page: page
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
            Promise.all([
              import('./components/product/ProductNavbar'),
              import('./components/product/ProductPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
              cb(null, {
                navbar: hideNavbar ? null : navbar,
                page: page
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
            Promise.all([
              import('./components/test/TestNavbar'),
              import('./components/test/TestPage'),
              import('./components/Tabbar')
              
            ]).then( ([navbar, page, tabbar]) => {
                cb(null, {
                  navbar: hideNavbar ? null : navbar,
                  page: page
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