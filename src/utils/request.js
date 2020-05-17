import axios from 'axios'
import { MessageBox } from 'element-ui'
import { responseCode } from '@/config'
import uiutils from '@/uiutils'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    const token = store.getters.getToken
    if (token) {
      config.headers['X-Access-Token'] = 'bearer ' + token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.code !== responseCode.SUCCESS) {
      uiutils.Message.error(res.msg)
      if (res.code === responseCode.CLIENT_ERROR || res.code === responseCode.SERVICE_ERROR) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.msg) {
        uiutils.Message.success(res.msg)
      }
      return response.data
    }
  },
  (error) => {
    console.log(error)
    uiutils.Message.error(error.response.data.msg)
    if (error.response.status === responseCode.UN_AUTHORIZATION) {
      store.dispatch('RestToken')
      router.replace({ path: '/sign-in' })
    }
    return Promise.reject(error)
  }
)

export default service
