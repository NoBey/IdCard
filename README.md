# IdCard - 身份证的工具库
----
本来是不想重新造轮子的可是找了找github上的仓库,看了看感觉都有bug而且很别扭,所以还是自己开刀搞,说说跟别的库有什么不同吧
- 对地区数据上不准备直接用网上的一些数据因为那些数据在计算到县和区的时候会漏掉市级的一些数据所以准备先对数据进行二次处理在引入



## 安装
`npm install js-idcard`

## 使用
```js
var IdCard = require('js-idcard')
```

### 注意:身份证传递时请使用字符串不要用数字类型

## 方法列表
----
### IdCard.EndNum(IdCard)
返回根据前17位数算出来的第18位

##### 参数说明
- @param {String} IdCard 身份证号码

##### 返回数据
`{Number}`

----

### IdCard.birthDay(IdCard)
返回计算出来的星期几,星座,生肖

##### 参数说明
- @param {String} IdCard 身份证号码

##### 返回数据
```js
{
  date: '2014/2/2',
  nong: '2013/3/3',
  year: 2001,
  month: 01,
  day: 01,
  week: '星期一', // 星期几
  zodiac: '天秤座',  // 星座
  zodiac_zh: '龙'  // 生肖
}
```
----

### IdCard.checkIdCard(IdCard)
返回验证身份证号是否正确


##### 参数说明
- @param {String} IdCard 身份证号码

##### 返回数据
`{Boolean}`

---

### IdCard.repairIdCard(IdCard)
返回补全身份证号


##### 参数说明
- @param {String} IdCard 身份证号码 18位活着残缺的17位

##### 返回数据
`{Number}`

---

### IdCard.num15to18(IdCard)
返回15位转换18位后的身份证号码


##### 参数说明
- @param {String} IdCard 身份证号码 15位

##### 返回数据
`{Number}`

---

### IdCard.sex(IdCard)
返回性别 男或女


##### 参数说明
- @param {String} IdCard 身份证号码

##### 返回数据
`{String}男或女`

---

### IdCard.nong(date)
返回性别 农历日期


##### 参数说明
- @param {String} date 日期 2016/01/01

##### 返回数据
`{String}农历日期`

---

### IdCard.address(IdCard)
返回 地址信息


##### 参数说明
- @param {String} IdCard 身份证号码

##### 返回数据
```json
{
  "address": "地址",
  "provinces": "省/直辖市",
  "citiy": "市",
  "areas": "县/区",
  "all": "省-市-县"
}

```

---

### IdCard.all(IdCard)
返回 全部解析的数据


##### 参数说明
- @param {String} IdCard 身份证号码

##### 返回数据
```js
{
  endNum: 6,
  birthDay: {
    date: '2014/2/2',
    nong: '2013/3/3',
    year: '1985',
    month: '01',
    week: '星期天',
    zodiac: '水瓶座',
    zodiac_zh: '牛'
  },
  checkIdCard: true,
  address: {
    address: '北京市平谷县',
    provinces: '北京市',
    citiy: '无',
    areas: '平谷县',
    all: '北京市--平谷县'
  },
  sex: '男'
}

```
