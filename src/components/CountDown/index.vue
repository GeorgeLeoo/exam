<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 9:03 PM
-->
<template>
  <div class="count-down">
    <i class="el-icon-alarm-clock icon"/>
    <span class="text">剩余时间</span>
    <span class="time"><span>{{ hour }}</span>：<span>{{ minute }}</span>：<span>{{ second }}</span></span>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    startTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hour: 2,
      minute: 23,
      second: 22
    }
  }
}
</script>

<style scoped lang="scss">
  .count-down {
    width:380px;
    height:80px;
    background:rgba(0,0,0,0.1);
    border-radius:40px;
    line-height: 80px;
    text-align: center;
    .icon {
      font-size: 26px;
    }

    .text {
      font-size: 20px;
      margin-left: 20px;
      margin-right: 16px;
    }

    .time {
      font-size: 30px;
      font-weight: 500;
    }
  }
</style>
