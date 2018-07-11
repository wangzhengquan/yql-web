import Picker from 'react-ui/picker'
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
	      value: [value.getFullYear(), value.getMonth(), value.getDate(),  value.getHours(), (value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes())],
	      onChange: function (picker, values, displayValues) {
	          // var daysInMonth = new Date(picker.value[0], picker.value[1]*1 + 1, 0).getDate();
	          // if (values[2] > daysInMonth) {
	          //     picker.cols[2].setValue(daysInMonth);
	          // }
	           
	          onChange && onChange(picker, values, displayValues)
	      },
	      formatValue: function (p, values, displayValues) {
	          return values[0] + '-' + (parseInt(values[1])+1) + '-' + values[2] + ' ' + values[3] + ':' + values[4];
	      },
	      cols: [
	           // Years
	          {
	              values: (function () {
	                  var arr = [];
	                  for (var i = 1950; i <= 2030; i++) { arr.push(i); }
	                  return arr;
	              })(),
	              displayValues: (function () {
	                  var arr = [];
	                  for (var i = 1950; i <= 2030; i++) { arr.push(i); }
	                  return arr;
	              })()
	          },
	          // Months
	          {
	              values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
	              displayValues: ('一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月').split(' '),
	              onChange: function (picker, month) {
	                  if(picker.cols[2].replaceValues && month*1 !== -1 ){
	                    var daysInMonth = new Date(picker.value[0], month*1 + 1, 0).getDate();
	                    var arr = [];
	                    var displayArr = [];
	                    for (var i = 1; i <= daysInMonth; i++) {
	                      displayArr.push(i);
	                      arr.push(i);
	                    }
	                    picker.cols[2].replaceValues(arr, displayArr);
	                  }
	              },
	              textAlign: 'left'
	          },
	          // Days
	          {
	              values: (function () {
	                  var arr = [];
	                  for (var i = 1; i <= value.getDate(); i++) { arr.push(i); }
	                  return arr;
	              })(),
	              displayValues: (function () {
	                  var arr = [];
	                  for (var i = 1; i <= value.getDate(); i++) { arr.push(i); }
	                  return arr;
	              })()
	              
	          },
	         
	          
	          // Hours
	          {
	              values: (function () {
	                  var arr = [];
	                  for (var i = 0; i <= 23; i++) { arr.push(i); }
	                  return arr;
	              })(),
	              displayValues: (function () {
	                  var arr = [];
	                  for (var i = 0; i <= 23; i++) { arr.push(i); }
	                  return arr;
	              })()
	          },
	          // Divider
	          {
	              divider: true,
	              content: ':'
	          },
	          // Minutes
	          {
	              values: (function () {
	                  var arr = [];
	                  for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
	                  return arr;
	              })(),
	              displayValues: (function () {
	                  var arr = [];
	                  for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
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