<!--
  @Description:
  @Author: George
  @Date: 2020/3/23 11:09 PM
-->
<template>
  <li class="score-list-item">
    <header>
      <h3 class="paper-name">{{ data.paperName }}</h3>
      <el-tag v-if="data.status === 0" type="success">已批改</el-tag>
      <el-tag v-if="data.status === 1" type="danger">未批改</el-tag>
    </header>
    <div class="main">
      <div class="time">
        <i class="el-icon-alarm-clock"/>
        考试时间：<span>{{ data.startTime | parseTime }}</span> - <span>{{ data.endTime | parseTime }}</span>
      </div>
      <div class="time">
        总分：<span>{{ data.total }}</span>
        考试时间：<span>{{ data.diffTime }}</span>
      </div>
      <el-button :disabled="data.status === 1" class="btn" type="primary" @click="$emit('show-paper', data._id)">查看试卷</el-button>
    </div>
    <div class="score">
      得分：<span class="score-text">{{ data.score }}</span>
    </div>
  </li>
</template>

<script>
import { Tag, Button } from 'element-ui'
export default {
  name: 'Item',
  components: {
    ElTag: Tag,
    ElButton: Button
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">
.score-list-item{
  margin-bottom: 16px;
  padding: 16px;
  border-radius:6px;
  border:1px solid rgba(213,216,222,1);
  .paper-name{
    display: inline-block;
    font-size:20px;
    line-height: 32px;
    font-weight:500;
    color:rgba(0,0,0,1);
    margin-right: 16px;
    vertical-align: middle;
  }
  .score{
    font-size:16px;
    font-weight:500;
    color:rgba(224,32,32,1);
    .score-text{
      font-size: 20px;
    }
  }
  .time{
    font-size:14px;
    font-weight:400;
    color:rgba(144,147,153,1);
    line-height: 28px;
  }
  .main{
    position: relative;
  }
  .btn{
    position: absolute;
    right: 0;
    top: 10px;
  }
}
</style>
