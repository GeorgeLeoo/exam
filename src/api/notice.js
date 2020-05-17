import request from '@/utils/request'

export const getNotices = (params) =>
  request({
    url: 'notices',
    method: 'get',
    params
  })
