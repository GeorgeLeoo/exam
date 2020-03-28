<!--
  @Description:
  @Author: George
  @Date: 2020/3/23 11:09 PM
-->
<template>
  <li class="score-list-item">
    <div class="item-container">
      <h3 class="paper-name">{{ data.knowledgePoint }}</h3>
      <span class="time">
        共：<span>{{ data.total }}题</span>
        难度：<span>{{ data.difficult }}</span>
      </span>
      <el-button class="btn" type="primary" @click="$emit('exam', data._id)">开始练习</el-button>
    </div>
  </li>
</template>

<script>
import { Button } from 'element-ui'
export default {
  name: 'Item',
  components: {
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
    line-height: 40px;
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
  .item-container{
    position: relative;
  }
  .btn{
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 10px;*/
    float: right;
  }
  .has-finished{
    font-size:14px;
    font-weight:400;
    color:rgba(96,98,102,1);
    line-height:14px;
    .num{
      color: #E02020;
    }
  }
}
</style>
