import chinaCity from '../data/china-city'

function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  }
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
  }
  return fmt
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}

/*
** 获取全国各省的信息
*/
function getPrivinceList () {
  let _provinceList = []
    for (let i = 0; i < chinaCity.length; i++) {
      let item = {}
      item.value = chinaCity[i].value
      item.label = chinaCity[i].label
      _provinceList.push(item)
    }
  return _provinceList
}

/*
** 根据省的名称获得省内各市的信息,这里的参数是省份的编号
*/
function getCityByProvince (privince) {
  let cityList = {}
    for (let i = 0; i < chinaCity.length; i++) {
      if (privince === chinaCity[i].label) {
        cityList = chinaCity[i].children
      }
    }
  console.log(cityList)
  return cityList
}

/*
** js深拷贝
*/
function deepCopy (obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

function degreeTypeChange (ipt) {
  switch (ipt) {
    case 0: return '其他'
    case 1: return '专科'
    case 2: return '本科'
    case 3: return '硕士'
    default: return '博士'
  }
}

function setLocalStorageAndTime (key, value) {
  window.localStorage.setItem(key, JSON.stringify({ data: value, time: new Date().getTime() }))
}

function getLocalStorageAndTime (key, exp = 6000000) {
  // 获取数据
  let data = window.localStorage.getItem(key)
  if (!data) return null
  let dataObj = {}
  try {
    dataObj = JSON.parse(data)
  } catch (err) {
    console.log(err)
    removeLocalStorage(key)
    return null
  }
  // 与过期时间比较
  if (new Date().getTime() - dataObj.time > exp) {
   // 过期删除返回null
   removeLocalStorage(key)
   console.log(key + '已过期')
   return null
  } else {
   return dataObj.data
  }
}

function removeLocalStorage (key) {
  window.localStorage.removeItem(key)
}

const common = {}
common.formatDate = formatDate
common.getPrivinceList = getPrivinceList
common.getCityByProvince = getCityByProvince
common.deepCopy = deepCopy
common.degreeTypeChange = degreeTypeChange
common.setLocalStorageAndTime = setLocalStorageAndTime
common.getLocalStorageAndTime = getLocalStorageAndTime

export default common
