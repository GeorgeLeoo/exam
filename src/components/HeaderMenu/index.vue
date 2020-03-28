<!--
  @Description:
  @Author: George
  @Date: 2020/3/22 4:59 PM
-->
<template>
  <ul class="header-menu">
    <template v-if="data">
      <li v-for="(item, index) in data" :key="index" class="menu-item">
        <router-link class="menu-item-link" :to="item.path">
          <i :class="[item.icon, item.path === $route.path ? 'active' : '']" class="icon" />
          <span :class="item.path === $route.path ? 'active' : ''" class="text">{{ item.text }}</span>
        </router-link>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'header-menu',
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
  .header-menu {
    display: inline-block;
    vertical-align: top;
    .menu-item{
      display: inline-block;
      line-height: 55px;
      width: 100px;
      /*cursor: pointer;*/
      text-align: center;
      .menu-item-link{
        display: inline-block;
        line-height: 55px;
        height: 55px;
        white-space: nowrap;
      }
      .icon, .text{
        margin-left: 10px;
        font-size:20px;
        font-weight:500;
        line-height:55px;
        color:rgba(96,98,102,1);
      }
      .active {
        color:rgba(64,158,255,1);
      }
    }
  }
</style>
