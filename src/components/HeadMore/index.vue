<!--
  @Description:
  @Author: George
  @Date: 2020/3/22 7:50 PM
-->
<template>
  <div class="head-more">
    <h4 class="title">{{ title }}</h4>
    <i class="arrow el-icon-arrow-right" @click="$emit('more')"/>
  </div>
</template>

<script>
export default {
  name: 'HeadMore',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  .head-more{
    font-size:16px;
    font-weight:400;
    color:rgba(109,114,120,1);
    line-height:22px;
    background: #fff;
    position: relative;
    .arrow{
      position: absolute;
      top: 3px;
      right: 0;
      background: #fff;
      cursor: pointer;
      padding: 0 10px;
      transition: all 0.3s ease;
      &:hover{
        color: rgba(64,158,255,1);
      }
    }
  }
</style>
