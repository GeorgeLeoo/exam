import request from '../utils/request'

/**
 * 通过id获取试卷信息
 * @param params
 */
export const getWrongs = (params) =>
  request({
    url: '/wrongs',
    method: 'get',
    params
  })

export const createWrongs = (data) =>
  request({
    url: '/wrongs',
    method: 'post',
    data
  })

export const getWrongsByType = (params) =>
  request({
    url: '/wrongs/type',
    method: 'get',
    params
  })
