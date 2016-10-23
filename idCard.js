var node_constellation = require('node-constellation');

var zodiac = function(month, date){
  if(month!=undefined && date!=undefined) return node_constellation(month, date, 'zh-cn')
  if(date==undefined && month!=undefined){
    
  }
  return
}
var dict = {
  week: {
    0: '星期一',
    1: '星期二',
    2: '星期三',
    3: '星期四',
    4: '星期五',
    5: '星期六',
    6: '星期天',
  },
  zodiac-zh = '鼠牛虎兔龙蛇马羊猴鸡狗猪'
}

// 计算18位应该是多少
function Take18Num(code) {
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  var sum = 0;
  var ai = 0;
  var wi = 0;
  for (var i = 0; i < 17; i++) {
    ai = code[i];
    wi = factor[i];
    sum += ai * wi;
  }
  var last = parity[sum % 11];
  return last;
}
// 解析生日信息
function Birthday (query_id_number) {
  var birthday, month, date;
    birthday = query_id_number.substr(6, 8);
    year = query_id_number.substr(6, 4);
    month = query_id_number.substr(10, 2);
    date = query_id_number.substr(12,2);

  return {
    date: birthday,
    year: year,
    constellation_cn: node_constellation(month, date, 'zh-cn'),
  };
}

module.exports = {
  Take18Num : Take18Num,
  Birthday : Birthday,

}
