/*
* @Description:
* @Author: George
* @Date: 2020/3/26 9:09 PM
* */
import request from '../utils/request'
import { knowledgePoint, papers, subjects } from './urls'

/**
 * 获取科目信息
 * @param params
 */
export const getSubjects = (params) =>
  request({
    url: subjects,
    method: 'get',
    params
  })

/**
 * 获取试卷信息
 * @param params
 */
export const getPapers = (params) =>
  request({
    url: papers,
    method: 'get',
    params
  })

/**
 * 获取试卷信息
 * @param params
 */
export const getKnowledgePoint = (params) =>
  request({
    url: knowledgePoint,
    method: 'get',
    params
  })
