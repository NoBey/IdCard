var node_constellation = require('node-constellation');

// 字典
var dict = {
  week: function(year, month, date) {
    var i = new Date(year, month-1, date).getUTCDay()
    var day = {
      0: '星期一',
      1: '星期二',
      2: '星期三',
      3: '星期四',
      4: '星期五',
      5: '星期六',
      6: '星期天',
    }
    return day[i]
  },
  zodiac_zh: function(year) {
    var arr = '鼠牛虎兔龙蛇马羊猴鸡狗猪'
    year = year%12-4
    if (year<0) year+=12
    return arr[year]
  },
  zodiac: function(month, date) {
    if (month != undefined && date != undefined) return node_constellation(month, date, 'zh-cn')
    if (date == undefined && month != undefined) {
      if (month.length == 4) return node_constellation(month.substr(0, 2), month.substr(2, 2), 'zh-cn')
      month = month.split(/\/|\\|-/)
      return node_constellation(month[0], month[1], 'zh-cn')
    }
    return
  }
}

// 计算最后一位应该是多少
function idCardEndNum(idCard) {
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  var sum = 0;
  var ai = 0;
  var wi = 0;
  for (var i = 0; i < 17; i++) {
    ai = idCard[i];
    wi = factor[i];
    sum += ai * wi;
  }
  var last = parity[sum % 11];
  return last;
}

// 解析生日信息
function Birthday(idCard) {
  var birthday, month, date;
  birthday = idCard.substr(6, 8);
  year = idCard.substr(6, 4);
  month = idCard.substr(10, 2);
  date = idCard.substr(12, 2);
  return {
    date: birthday,
    year: year,
    month: month,
    date: date,
    week: dict.week(year, month, date), // 星期几
    zodiac: dict.zodiac(month, date),  // 星座
    zodiac_zh: dict.zodiac_zh(year)   // 生肖
  };
}

module.exports = {
  EndNum: idCardEndNum,
  Birthday: Birthday,
  all:(idCard)=>{
    return {
      EndNum: idCardEndNum(idCard),
      Birthday: Birthday(idCard)
    }
  }
}
