export default {

	'regist': {
		title: '注册',
		action: 'regist',
		tokenStorageKey: 'regist-token',
		tokenHeaderKey: 'Regist-Token',
		url: '/user/regist',
		method: 'POST'
	},
	'retrieve-password': {
		title: '找回密码',
		action: 'retrieve-password',
		tokenStorageKey: 'reset-password-token',
		tokenHeaderKey: 'Reset-Password-Token',
		url: '/user/resetpassword',
		method: 'put'
	}

}