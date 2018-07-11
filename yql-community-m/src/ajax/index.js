import Ajax from 'react-ui/ajax'
import Notifications from 'react-ui/notifications'
import CONFIG from '../config'

Ajax.ajaxSetup({
	dataType: 'json',
	crossDomain: true
})

export default {
	ajax(settings){
		var headers = settings.headers || {}
		if (window.localStorage.getItem('token')) {
		  var headers = settings.headers || {}
		  headers['Access-Token'] = (window.localStorage.getItem('token'))
		 
		}

		// if(document.cookie){
		// 	headers.cookie = document.cookie
		// }

		settings.headers = headers
		
		var url = undefined;
		if(CONFIG.API_HOST.endsWith('/') || settings.url.startsWith('/')){
			url =  CONFIG.API_HOST + settings.url
		} else {
			url =  CONFIG.API_HOST + '/' + settings.url
		}

		settings = Object.assign(settings, {
			url: url
		})

		if(settings.success ){
			var success = settings.success;
			settings.success = function(...args){
				var json = args[0]
				if(json.error){
					Notifications.addNotification({
						hold: 2000,
				        title: '错误',
				        //subtitle: 'New message from John Doe',
				        message: json.message,
				        media: '<img width="30" height="30" style="border-radius:100%" src="../resources/img/share/icon-error.gif">'
				    })
				}
				success(...args)
			}

			var error = settings.error
			
			settings.error = function(...args) {
				console.error(args);
				Notifications.addNotification({
					hold: 2000,
			        title: '错误',
			        message: '网络错误',
			        media: '<img width="30" height="30" style="border-radius:100%" src="../resources/img/share/icon-error.gif">'
			    })

			    if(error) {
			    	error(...args)
			    }
			}

			
			return Ajax.ajax(settings);
		}

		return new Promise(function(resolve, reject){
			//var success = settings.success;
			settings.success = function (...args){
				var json = args[0]
				if(json.error){
					Notifications.addNotification({
						hold: 2000,
				        title: '错误',
				        message: json.message,
				        media: '<img width="30" height="30" style="border-radius:100%" src="../resources/img/share/icon-error.gif">'
				    })
				}
				//success && success(...args)
				resolve(args)
			}

			//var error = settings.error;
			settings.error = function (...args){
				console.error(args);
				Notifications.addNotification({
					hold: 2000,
			        title: '错误',
			        message: '网络错误',
			        media: '<img width="30" height="30" style="border-radius:100%" src="../resources/img/share/icon-error.gif">'
			    })
				reject(args)
			}
			
			Ajax.ajax(settings);
		})
	},

	postFormData(settings) {
		var formData = new FormData();
		var data = settings.data;
		for(var p in data){
			formData.append(p, data[p]);
		}
		settings.method = 'POST'
		settings.data = formData;
		return this.ajax(settings);
	}
}