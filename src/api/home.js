/*
* @Description:
* @Author: George
* @Date: 2020/3/23 5:25 PM
* */
import request from '@/utils/request'
import { hotSubjects, hotPapers } from './urls'

/**
 * 获取热门科目信息
 * @param params
 */
export const getHotSubjects = (params) =>
  request({
    url: hotSubjects,
    method: 'get',
    params
  })
/**
 * 获取热门试卷信息
 * @param params
 */
export const getHotPapers = (params) =>
  request({
    url: hotPapers,
    method: 'get',
    params
  })
