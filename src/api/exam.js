import request from '../utils/request'
import { papers } from './urls'

/**
 * 通过id获取试卷信息
 * @param params
 */
export const getPaperByIds = (params) =>
  request({
    url: papers,
    method: 'get',
    params
  })

/**
 * 添加答题卡
 * @param data
 * @returns {AxiosPromise}
 */
export const addAnswer = (data) =>
  request({
    url: 'answers',
    method: 'post',
    data
  })
