/*
* @Description:
* @Author: George
* @Date: 2020/3/26 9:09 PM
* */
import request from '../utils/request'
import { papers, afq, completions, judges, multiples, questionBank, singles, subjects } from './urls'

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
 * 通过id获取试卷信息
 * @param _id
 * @param paperType
 * @param user
 */
export const getPaperById = (_id, paperType, user) =>
  request({
    url: 'paper',
    method: 'get',
    params: { _id, paperType, user }
  })

/**
 * 获取试卷信息
 * @param params
 */
export const getKnowledgePoint = (params) =>
  request({
    url: '/papers/knowledge-points',
    method: 'get',
    params
  })

/**
 * 验证试卷密码
 * @param data
 */
export const verifyPaperPassword = (data) =>
  request({
    url: '/papers/exam',
    method: 'post',
    data
  })

/**
 * 考点查询
 * @param params
 * @returns {AxiosPromise}
 */
export const getKnowledgePointBySingle = (params) =>
  request({
    url: '/question-bank/singles/knowledge-points',
    method: 'get',
    params
  })

export const getKnowledgePointByMultiple = (params) =>
  request({
    url: '/question-bank/multiples/knowledge-points',
    method: 'get',
    params
  })

export const getKnowledgePointByJudge = (params) =>
  request({
    url: '/question-bank/judges/knowledge-points',
    method: 'get',
    params
  })

export const getKnowledgePointByCompletion = (params) =>
  request({
    url: '/question-bank/completions/knowledge-points',
    method: 'get',
    params
  })

export const getKnowledgePointByAFQ = (params) =>
  request({
    url: '/question-bank/afqs/knowledge-points',
    method: 'get',
    params
  })

export const getSingles = (params) =>
  request({
    url: questionBank + singles,
    method: 'get',
    params
  })

export const getMultiples = (params) =>
  request({
    url: questionBank + multiples,
    method: 'get',
    params
  })

export const getJudges = (params) =>
  request({
    url: questionBank + judges,
    method: 'get',
    params
  })

export const getCompletions = (params) =>
  request({
    url: questionBank + completions,
    method: 'get',
    params
  })

export const getAFQs = (params) =>
  request({
    url: questionBank + afq,
    method: 'get',
    params
  })
