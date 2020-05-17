import request from '@/utils/request'
import { subjects } from '@/api/urls'

export const getSubjects = (params) =>
  request({
    url: subjects,
    method: 'get',
    params
  })
