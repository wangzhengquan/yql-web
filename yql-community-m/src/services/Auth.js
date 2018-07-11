import Ajax from '../ajax'
// import Cookie from 'react-ui/cookie'
import base64url from 'base64url';

export default {
  // user: null,
  user: null,
  login(data) {
    var me  = this;

    Ajax.ajax({
      type: 'GET',
      url: 'community/login',
      data: data,
      success: (json) => {
        if(!json.error){
          me.setUser(json.data)
          localStorage.setItem('token' , json.token)

          if(json.status === 412){
            location.replace('/regist-community-info');
          } else {
            location.replace(window.sessionStorage.getItem('nextPath') || '/')
            sessionStorage.removeItem('nextPath')
            
          }
        } 
      }
    })
     
  },

  getUserId(){
    try{
      var tokenInArr = decodeURIComponent(this.getToken()).split('.')
      var payload = JSON.parse(base64url.decode(tokenInArr[1]))
      return payload.sub;
    }catch(e){
      console.error(e);
      return undefined;
    }
   
  },

  getCommunityId(){
    return this.getUserId();
  },

  getCommunity(){
    return this.user.community
  },
  
  setCommunity(community){
    this.community = community
  },

  getUser(){
    return this.user
  },

  setUser(user){

    this.user = user;
    if(user.community) user.community.user = user;

  },

   

  getToken() {
    return localStorage.getItem('token')
  },

  logout(cb) {
    localStorage.removeItem('token')
    if (cb) cb()
  },

  isCommunityLogged(nextState, cb) {
    var me = this;
    if(!cb){
      cb = nextState;
      nextState = undefined;
    }

    // if(nextState && nextState.location.query.token) {
    //    window.localStorage.setItem('token', (nextState.location.query.token))
    // }
    if( !localStorage.getItem('token')){
       cb && cb(false);
       return false
    }  
    else {
      Ajax.ajax({
        type: 'GET',
        url: 'community/islogged',
         
        success: (json) => {
          if(json.error){
            if (cb) cb(false)
          } else {
            me.setUser(json.data)
            if(json.status===412){
              window.sessionStorage.setItem('nextPath', location.pathname)
              location.replace('/regist-community-info');
              
             // if(cb)  cb(false)

            }else{
              if(cb)  cb(true)
            }
            
          } 
        },
        error: (err) => {

          console.error(err)
          if (cb) cb(false)
        }
      })
    }
  },

  isLogged(cb) {
    var me = this;
    if( !localStorage.getItem('token')){
       cb && cb(false);
       return false
    }  
    else {
      Ajax.ajax({
        type: 'GET',
        url: 'user/islogged',
         
        success: (json) => {
          if(json.error){
            me.setUser(json.data)
            if (cb) cb(false)
          } else {
            if(cb)  cb(true, me.user)
          } 
        },
        error: (err) => {

          console.error(err)
          if (cb) cb(false)
        }
      })
    }
  }

   
}



 
