import request from '@/utils/request'

export const login = (data) =>
  request({
    url: '/user/login',
    method: 'post',
    data
  })

export const register = (data) =>
  request({
    url: '/user/register',
    method: 'post',
    data
  })

export const getUserInfo = (params) =>
  request({
    url: '/user/info',
    method: 'get',
    params
  })
