import Ajax from '../ajax'
import base64url from 'base64url';

export default {
  user: null,
  login(data, cb) {
     var me  = this;
    // cb = arguments[arguments.length - 1]

    Ajax.ajax({
      type: 'GET',
      url: 'user/login',
      data: data,
      success: (json) => {
        if(!json.error){
          me.setUser(json.data)
          localStorage.setItem('token' , json.token)
          cb && cb(true)
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
            if (cb) cb(false)
          } else {
            me.setUser(json.data)
            if(cb)  cb(true)
          }
        },
        error: () => {
          if (cb) cb(false)
        }
      })
    }
  },

  isCommunityLogged(cb) {
    var me = this;
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
            if(cb)  cb(true)
          }
        },
        error: () => {
          if (cb) cb(false)
        }
      })
    }
  }

   

   
}



 
