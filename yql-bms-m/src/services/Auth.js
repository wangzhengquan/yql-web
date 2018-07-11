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
      url: 'bms-user/login',
      data: data,
      success: (json) => {
        if(!json.error){
          me.setUser(json.data)
          localStorage.setItem('token' , json.token)
          location.replace(window.sessionStorage.getItem('nextPath') || '/')
          sessionStorage.removeItem('nextPath')
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

  

  getUser(){
    return this.user
  },

  setUser(user){

    this.user = user;

  },

   

  getToken() {
    return localStorage.getItem('token')
  },

  logout(cb) {
    localStorage.removeItem('token')
    if (cb) cb()
  },

   

  isLogged(nextState, cb) {
     var me = this;
    if(!cb){
      cb = nextState;
      nextState = undefined;
    }
    if( !localStorage.getItem('token')){
       cb && cb(false);
       return false
    }  
    else {
      Ajax.ajax({
        type: 'GET',
        url: 'bms-user/islogged',
         
        success: (json) => {
          if(json.error){
            me.setUser(json.data)
            if (cb) cb(false)
          } else {
            if(cb)  cb(true, me.user)
          } 
        },
        error: () => {

          if (cb) cb(false)
        }
      })
    }
  }

   
}



 
