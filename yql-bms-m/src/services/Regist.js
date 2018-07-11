/*eslint no-console: 0 */
import Ajax from '../ajax'
// import Cookie from 'react-ui/cookie'
import base64url from 'base64url';

export default {

  verifyCode(data, cb) {
    Ajax.ajax({
      method: 'GET',
      url: 'verify-code',
      data: data
    }).then(function([json]) {
      if (json.error) {
        alert(json.message)
        if (cb) cb(false)
        return;
      }

      sessionStorage.setItem('regist-token', json['token'])
      if (cb) cb(true)

    }, function(err) {

      alert(err.message);
      console.error('err', err)
      if (cb) cb(false)
    })
  },

  setPassword(data, cb) {
    cb = arguments[arguments.length - 1]

    Ajax.ajax({
      method: 'POST',
      url: 'user/regist',
      headers: {
        'Regist-Token': sessionStorage.getItem('regist-token')
      },
      data: data
    }).then(function([json]) {
      if (!json.error) {
        var user =  json.data;
        localStorage.setItem('token' , json.token)
        // localStorage.setItem('user', me.user)
        if (cb) cb(true, user)
      } else {
        alert(json.message)
        if (cb) cb(false)
      }
    }, function(err) {
      console.error('err', err)
      if (cb) cb(false)
    })

  },

  registCommunity(data, cb) {
    var headers = {}
    if(sessionStorage.getItem('regist-token')){
      headers['Regist-Token']=sessionStorage.getItem('regist-token')
    }
      
    Ajax.ajax({
      method: 'POST',
      headers: headers,
      contentType: 'applicaton/json',
      url: 'community/regist',
      data: JSON.stringify(data)
    }).then(function([json]) {

      if(json.error) {
        alert(json.message)
        if (cb) cb(false)
        return;
      }

      if (cb) cb(true)

    }, function(err) {

      alert(err.message || JSON.stringify(err));
      console.error('err', err)
      if (cb) cb(false)
    })
  },

  getMobile(){
    try{
      var tokenInArr = decodeURIComponent(this.getToken()).split('.')
      var payload = JSON.parse(base64url.decode(tokenInArr[1]))
      return payload.sub;
    } catch(e) {
      console.error(e);
      return undefined;
    }
   
  }







}
