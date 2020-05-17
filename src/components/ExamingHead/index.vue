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
    <div v-if="data.testType === 1" class="camera">
      <video ref="videoCamera" id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas style="display:none;" ref="canvasCamera" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>
      <div v-if="imgSrc" class="img_bg_camera">
        <img :src="imgSrc" alt="" class="tx_img">
        <div class="img_btn_camera">
          {{validTip}}
        </div>
      </div>
      <div v-else class="btn_camera">把您的脸至于圆圈中央</div>
    </div>
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
  data () {
    return {
      videoWidth: 540,
      videoHeight: 410,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      validTip: '验证中'
    }
  },
  mounted () {
    // this.getCompetence()
  },
  beforeDestroy () {
    // this.stopNavigator()
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
    video,canvas,.tx_img{
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .btn_camera{
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 50px;
      background-color: rgba(0,0,0,0.3);
      line-height: 50px;
      text-align: center;
      color: #ffffff;
    }
    .bg_r_img{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .img_bg_camera {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;

      img {
        width: 100%;
        height: 100%;
      }

      .img_btn_camera {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.3);
        color: #ffffff;

        .loding_img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
</style>
