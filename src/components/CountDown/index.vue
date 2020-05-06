<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 9:03 PM
-->
<template>
  <div class="count-down">
    <i class="el-icon-alarm-clock icon"/>
    <span class="text">剩余时间</span>
    <span class="time"><span>{{ hour | timeFilter }}</span>：<span>{{ minute | timeFilter }}</span>：<span>{{ second | timeFilter }}</span></span>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    startTime: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  data () {
    return {
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  watch: {
    startTime () {
      this.setCountDown()
    }
  },
  mounted () {
  },
  methods: {
    setCountDown () {
      const times = this.startTime.split(':')
      this.hour = Number(times[0])
      this.minute = Number(times[1])
      this.second = Number(times[2])
      const timer = setInterval(() => {
        if (this.hour === 0 && this.minute === 10 && this.second === 0) {
          this.$notify({
            title: '警告',
            message: '还有10分钟考试结束',
            type: 'warning',
            offset: 100
          })
        }
        if (this.hour === 0 && this.minute === 2 && this.second === 0) {
          this.$notify({
            title: '警告',
            message: '还有2分钟考试结束',
            type: 'warning',
            offset: 100
          })
        }
        if (this.hour === 0 && this.minute === 0 && this.second === 0) {
          this.hour = 0
          this.minute = 0
          this.second = 0
          clearInterval(timer)
          this.$emit('time-over')
          return
        }
        if (Number(this.second) === 0) {
          this.second = 59
          if (Number(this.minute) !== 0) {
            this.minute--
          } else {
            if (this.hour !== 0) {
              this.minute = 59
              this.hour--
            }
          }
        } else {
          this.second--
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
  .count-down {
    width: 380px;
    height: 80px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 40px;
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
