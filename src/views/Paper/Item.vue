<!--
  @Description:
  @Author: George
  @Date: 2020/3/23 11:09 PM
-->
<template>
  <li class="score-list-item">
    <header>
      <h3 class="paper-name">{{ data.paperName }}</h3>
      <span class="has-finished">已有<span class="num">{{ data.participantNumber ? data.participantNumber : 0 }}</span>人完成</span>
      <div class="tag">
        <el-tag
          v-if="data.paperType === 1"
        >
          {{ data.paperType | paperTypeFilter }}
        </el-tag>
        <el-tag
          v-if="data.paperType === 0"
          type="danger"
        >
          {{ data.paperType | paperTypeFilter }}
        </el-tag>
      </div>
    </header>
    <div class="main">
      <div class="time">
        <i class="el-icon-alarm-clock"/>
        考试时间：<span>{{ data.startTime | parseTime }}</span> - <span>{{ data.endTime | parseTime }}</span>
      </div>
      <div class="time">
        总分：<span>{{ data | paperTotalScore }}</span>
        <span class="gap"></span>
        考试时长：<span>{{ data | getDurationTime }}</span>
      </div>
      <el-button class="btn" type="primary" @click="$emit('exam', data._id)">开始考试</el-button>
    </div>
  </li>
</template>

<script>
import { Button, Tag } from 'element-ui'
export default {
  name: 'Item',
  components: {
    ElButton: Button,
    ElTag: Tag
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
  .gap{
    padding-right: 32px;
  }
  .has-finished{
    display: inline-block;
    font-size:14px;
    font-weight:400;
    color:rgba(96,98,102,1);
    line-height:32px;
    height: 32px;
    .num{
      color: #E02020;
    }
  }
  .tag {
    display: inline-block;
    margin-left: 24px;
  }
}
</style>
