var node_constellation = require('node-constellation');
var dataAddress = require('./data/data.json')
  // 字典
var dict = {
  week: function(year, month, date) {
    var i = new Date(year, month - 1, date).getUTCDay()
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
    year = year % 12 - 4
    if (year < 0) year += 12
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
function birthDay(idCard) {
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
    zodiac: dict.zodiac(month, date), // 星座
    zodiac_zh: dict.zodiac_zh(year) // 生肖
  };
}

// 验证身份证号是否正确
function checkIdCard(idCard) {
  if (/(^\d{18}$)/.test(idCard) && idCardEndNum(idCard) == idCard[17]) return true
  return false
}

// 补全身份证号
function repairIdCard(idCard) {
  if (/(^\d{17}$)/.test(idCard)) return idCard + idCardEndNum(idCard)
  if (/(^\d{18}$)/.test(idCard)) return idCard.slice(0, 17) + idCardEndNum(idCard)
}

// 15位转换18位
function num15to18(idCard) {
  if (/(^\d{15}$)/.test(idCard)) return repairIdCard(idCard.slice(0, 6) + '19' + idCard.slice(6, 15))
}

// 地址信息解析
function address(idCard) {
  var addressId = idCard.slice(0, 6)
  var data = dataAddress[addressId]
  data.all = (data.provinces + '-' + data.citiy + '-' + data.areas).replace('无', '')
  return data
}

/* 地址信息返回格式
{
  "address": "地址",
  "provinces": "省/直辖市",
  "citiy": "市",
  "areas": "县/区",
  "all": "省-市-县"
}
*/


// 性别解析
function sex(idCard) {
  if (idCard[16] % 2) return '男'
  return '女'
}

module.exports = {
  endNum: idCardEndNum,
  birthDay: birthDay,
  checkIdCard: checkIdCard,
  repairIdCard: repairIdCard,
  num15to18: num15to18,
  sex: sex,
  address: address,
  all: (idCard) => {
    return {
      endNum: idCardEndNum(idCard),
      birthDay: birthDay(idCard),
      checkIdCard: checkIdCard(idCard),
      address: address(idCard),
      sex: sex(idCard)
    }
  }
}


// console.log(num15to18("411403960314001"))

// console.log(checkIdCard("411403199603140010"))
