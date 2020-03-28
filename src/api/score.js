/*
* @Description:
* @Author: George
* @Date: 2020/3/23 5:25 PM
* */
import request from '@/utils/request'
import { scores } from '@/api/urls'

/**
 * 获取成绩信息
 * @param params
 */
export const getScore = (params) =>
  request({
    url: scores,
    method: 'get',
    params
  })
