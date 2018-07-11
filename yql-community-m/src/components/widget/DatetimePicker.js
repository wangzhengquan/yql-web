import Picker from 'react-ui/picker'
function getDays(){
	var days = []
	var year = new Date().getFullYear()
	for(var month=0; month<12; month++){
		var daysInMonth = new Date(year, month+1, 0).getDate()
		for(var date =0; date< daysInMonth; date++){
			days.push(new Date(year, month, date+1))
		}
		
	}
	return days;
}
var weeks = ['周日','周一', '周二','周三','周四','周五','周六']
var now = new Date()
var dateArr = getDays()
var DateTimePicker = {
	create : function(input, value, onChange) {
	  var needClearFirst = false
	  if(!value){
	  	needClearFirst = true;
	  	value = new Date()
	  } else {
	  	if(typeof value === 'number'){
	  		value = new Date(value)
	  	}  
	  }
	  var picker = Picker.picker({
	      input: input,
	      toolbarTemplate:
	      '<div class="toolbar">' +
	          '<div class="toolbar-inner">' +
	              '<div class="left">' +
	                  '<a href="#" class="link toolbar-randomize-link"></a>' +
	              '</div>' +
	              '<div class="right">' +
	                  '<a href="#" class="link clear-picker" style="float: left; margin-right: 10px;">清空</a>' +
	                  '<a href="#" class="link close-picker">确定</a>' +
	              '</div>' +
	          '</div>' +
	      '</div>',
	      rotateEffect: true,
	      value: [ new Date(value.getFullYear(), value.getMonth(), value.getDate()),  value.getHours(), (value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes())],
	      onChange: function (picker, values, displayValues) {
	          // var daysInMonth = new Date(picker.value[0], picker.value[1]*1 + 1, 0).getDate();
	          // if (values[2] > daysInMonth) {
	          //     picker.cols[2].setValue(daysInMonth);
	          // }
	           
	          onChange && onChange(picker, values? new Date(values[0].getFullYear(), values[0].getMonth(),  values[0].getDate(),  values[1], values[2]): undefined)
	      },
	      formatValue: function (p, values, displayValues) {
	          return values[0].getFullYear() + '-' + (values[0].getMonth()+1) + '-' + values[0].getDate() + ' ' + (values[1]<10? '0'+values[1]: values[1]) + ':' +(values[2]<10? '0'+values[2]: values[2]);
	      },
	      cols: [
	          
	          {
	              values: dateArr,
	              displayValues: (function(){
	              	var displayDays = []
	              	for(var i=0,len= dateArr.length; i<len; i++){
	              		if(now.getMonth() === dateArr[i].getMonth() && now.getDate() === dateArr[i].getDate()){
	              			displayDays.push('今天')
	              		} else{
	              			displayDays.push((dateArr[i].getMonth()+1)+'月'+dateArr[i].getDate()+'日' + ' ' + weeks[dateArr[i].getDay()])
	              		}
	              		
	              	}
	              	return displayDays;
	              })(),
	              
	              textAlign: 'center'
	          },
	          
	         // Divider
	          {
	              divider: true,
	              content: '  '
	          },
	          
	          // Hours
	          {
	              values: (function () {
	                  var arr = [];
	                  for (var i = 0; i < 24; i++) { arr.push(i); }
	                  return arr;
	              })(),
	              displayValues: (function () {
	                  var arr = [];
	                  for (var i = 0; i < 24; i++) { arr.push(i < 10 ? '0' + (i) : i); }
	                  return arr;
	              })()
	          },
	          
	          // Minutes
	          {
	              values: (function () {
	                  var arr = [];
	                  for (var i = 0; i < 60; i++) { arr.push(i); }
	                  return arr;
	              })(),
	              displayValues: (function () {
	                  var arr = [];
	                  for (var i = 0; i < 60; i++) { arr.push(i < 10 ? '0' + (i) : i); }
	                  return arr;
	              })()
	          }
	      ]
	  });

	  if(needClearFirst)
	  	picker.clearValue()
	  
	  return picker;
	}

}

export default DateTimePicker