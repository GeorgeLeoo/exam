/**
 * 请求状态码
 */
export const responseCode = {
  SUCCESS: 200, //  请求成功
  UN_AUTHORIZATION: 401, // 客户端未授权、未登录
  CLIENT_ERROR: 406, //  客户端错误，未传递正确的参数
  SERVICE_ERROR: 500 //  服务器内部错误
}

/**
 * ElementUI Message 持续时间
 */
export const messageDuration = {
  short: 3 * 1000,
  login: 5 * 1000
}

/**
 * message 类型
 */
export const messageType = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

export const url = 'http://139.159.201.22:4500'
export const local = 'http://localhost:4500'

const config = {
  responseCode,
  messageDuration,
  messageType,
  url
}

export default config
