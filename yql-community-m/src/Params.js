var isWeiXin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
export default {
	hideNavbar : isWeiXin
}