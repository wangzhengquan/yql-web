
//状态:canceled（已取消）, notstart(未开始),registing(报名中), registend(报名结束),started(进行中) ,end（已结束）
var STATUS = {
	'canceled': '已取消',
	'notstart': '未开始',
	'registing': '开始报名中',
	'registend': '报名已结束',
	'started': '活动已开始',
	'end': '活动已结束'
}
export default {
	getStatusLabel(name){
		return STATUS[name]
	},
	canRegist(status){
		return (!status || status === 'registing' ) 
	}

}