<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 8:47 PM
-->
<template>
  <div class="examing-head">
    <h3 class="title">
      <span class="paper-name">{{ data.paperName }}</span>
      <span v-if="data.testType === 0" class="paper-type">（模拟考试）</span>
      <span class="username">{{ data.username }}</span>
    </h3>
    <count-down class="count-down" :start-time="data.startTime" @time-over="handleTimeOver"/>
    <div  v-if="data.testType === 1" class="camera">camera</div>
    <div class="cover"></div>
  </div>
</template>

<script>
import CountDown from '@/components/CountDown'

export default {
  name: 'ExamingHead',
  components: {
    CountDown
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleTimeOver () {
      this.$emit('time-over')
    }
  }
}
</script>

<style scoped lang="scss">
  .examing-head {
    position: relative;
    height: 260px;
    overflow-x: hidden;
    /*background: rgba(64, 158, 255, 1);*/
    color: #fff;

    .cover {
      position: absolute;
      top: 0;
      left: -100px;
      z-index: -9;
      width: calc(100% + 200px);
      height: 260px;
      background: rgba(64, 158, 255, 1);
      border-bottom-left-radius: 40%;
      border-bottom-right-radius: 66%;
    }

    .title {
      display: inline-block;
      padding-top: 40px;
      padding-left: 100px;

      .paper-name, .paper-type {
        font-size: 40px;
        font-weight: 600;
      }

      .user, .username {
        font-size: 20px;
        margin-left: 32px;
      }
    }

    .camera {
      float: right;
      width: 136px;
      height: 96px;
      margin-top: 16px;
      margin-right: 76px;
      background-color: #EBEEF5;
    }

    .count-down {
      float: right;
      margin-right: 40px;
      margin-top: 28px;
    }
  }
</style>
