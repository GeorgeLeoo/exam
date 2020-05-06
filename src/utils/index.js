/*
* @Description:
* @Author: George
* @Date: 2020/3/24 9:41 PM
* */
export const parseTime = (
  time,
  cFormat
) => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * 深拷贝
 * @param {*} obj 要拷贝的对象
 */
export const deepClone = (obj = {}) => {
  // 值类型的情况下直接返回
  // obj 是 null，或者不是对象也不是数组，就直接返回
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  // 初始化返回结果,是数组就定义为数组，是对象就定义为对象
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (const key in obj) {
    // 判断 key 是否是自身的属性
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      // 保证不是原型上的属性
      result[key] = deepClone(obj[key])
    }
  }

  return result
}
