<!--
  @Description:
  @Author: George
  @Date: 2020/3/22 11:09 AM
-->
<template>
  <header class="header">
    <div class="wrapper1024">
      <div class="left">
        <router-link class="logo" to="/">
          <img class="logo-img" src="./../../assets/logo.png" alt="">
          <h3 class="title">考试通</h3>
        </router-link>
        <header-menu :data="menuList"/>
      </div>
      <div class="right">
        <div class="icon-container">
          <i class="el-icon-bell"/>
        </div>
        <dropdown>
          <span class="el-dropdown-link">
            <avatar class="avatar" shape="square" size="large"
                       src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"/>
          </span>
          <dropdown-menu slot="dropdown">
            <dropdown-item>个人中心</dropdown-item>
            <dropdown-item>退出</dropdown-item>
          </dropdown-menu>
        </dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { Avatar, Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
import HeaderMenu from '@/components/HeaderMenu'
import { menuList } from './settings'

export default {
  name: 'Header',
  components: {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    HeaderMenu
  },
  data () {
    return {
      menuList
    }
  }
}
</script>

<style lang="scss">
  .header {
    height: 55px;
    box-shadow: 0 0 3px #ccc;

    .left {
      float: left;
      height: 55px;
    }

    .right {
      float: right;
      height: 55px;
      line-height: 55px;
      .icon-container{
        display: inline-block;
        height: 55px;
        line-height: 55px;
        position: relative;
        top: -8px;
        padding: 0 16px;
      }
    }

    .logo {
      font-size: 0;
      margin-right: 90px;
      position: relative;

      .logo-img {
        width: 34px;
        height: 34px;
        margin-top: 10px;
      }

      .title {
        display: inline-block;
        margin-left: 18px;
        height: 55px;
        font-size: 32px;
        font-weight: 400;
        line-height: 55px;
        vertical-align: top;
        color: rgba(64, 158, 255, 1);
      }
    }

    .avatar {
      position: relative;
      top: 6px;
      display: inline-block;
      height: 42px;
      margin: auto;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
</style>
