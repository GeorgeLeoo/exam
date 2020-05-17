/*
* @Description:
* @Author: George
* @Date: 2020/3/24 9:40 PM
* */

export { parseTime } from '@/utils'

/**
 * 计算时间差
 * @param item
 */
export const getDurationTime = (item) => {
  const diffTime = (new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) / 1000 // 计算时间差,并把毫秒转换成秒
  const days = parseInt(diffTime / 86400 + '') // 天  24*60*60*1000
  const hours = parseInt(diffTime / 3600 + '') - 24 * days // 小时 60*60 总小时数-过去的小时数=现在的小时数
  const minutes = parseInt(diffTime % 3600 / 60 + '') // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
  const seconds = parseInt(diffTime % 60 + '') // 以60秒为一整份 取余 剩下秒数
  return (hours > 10 ? hours : ('0' + hours)) + ':' + (minutes > 10 ? minutes : ('0' + minutes)) + ':' + (seconds > 10 ? seconds : ('0' + seconds))
}

/**
 * 计算试卷总分
 * @param item
 */
export const paperTotalScore = (item) => {
  let totalScore = 0
  if (item.paperType === 0) {
    totalScore = item.singleScore * item.single.length +
      item.multipleScore * item.multiple.length +
      item.judgeScore * item.judge.length +
      item.completionScore * item.completion.length +
      item.afqScore * item.afq.length
  }
  if (item.paperType === 1) {
    totalScore = item.singleScore * item.singleNumber +
      item.multipleScore * item.multipleNumber +
      item.judgeScore * item.judgeNumber +
      item.completionScore * item.completionNumber +
      item.afqScore * item.afqNumber
  }
  return totalScore
}

export const paperTypeFilter = (type) => {
  const statusMap = {
    0: '固定组卷',
    1: '随机组卷'
  }
  return statusMap[type]
}

export const timeFilter = (time) => {
  return Number(time) < 10 ? '0' + time : time
}

export const trueOrFalseFilter = (type) => {
  const statusMap = {
    0: '正确',
    1: '错误'
  }
  return statusMap[type]
}
