var chineseLunar = require("chinese-lunar");

function aa(ba){
  ba = ba.slice(0,4)+'/'+ba.slice(4,6)+'/'+ba.slice(6,8)
  a = new Date(ba)
  try {
      var lunar = chineseLunar.solarToLunar(a)
  } catch (err) {
    return '时间错误'
  }
  return lunar.year+'/'+lunar.month+'/'+lunar.day
}
// console.log(aa('09840715'))

module.exports = aa
