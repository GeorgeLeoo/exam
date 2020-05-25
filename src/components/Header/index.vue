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
        <header-menu :data="menu"/>
      </div>
      <div class="right">
        <div class="icon-container">
          <el-popover
            placement="bottom"
            width="800"
            trigger="click">
            <div>
              <el-table :data="notices">
                <el-table-column property="content" label="内容"></el-table-column>
                <el-table-column width="200" property="createdAt" label="日期">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | parseTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div style="padding: 16px;text-align: center">
                <pagination
                  v-if="total > limit"
                  :total="total"
                  :page.sync="page"
                  :limit.sync="limit"
                  background
                  layout="prev, pager, next"
                  @current-change="handleChangePagination"
                />
              </div>
            </div>
            <i class="el-icon-bell" slot="reference"/>
          </el-popover>
        </div>
        <dropdown @command="handleSelect">
          <span class="el-dropdown-link">
            <avatar class="avatar" shape="square" size="large"
                       src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1305353222,2352820043&fm=26&gp=0.jpg"/>
          </span>
          <dropdown-menu slot="dropdown">
            <dropdown-item :command="1">个人中心</dropdown-item>
            <dropdown-item :command="2">退出</dropdown-item>
          </dropdown-menu>
        </dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { Avatar, Dropdown, DropdownItem, DropdownMenu, Popover, Table, TableColumn, Pagination } from 'element-ui'
import HeaderMenu from '@/components/HeaderMenu'
import { getNotices } from '../../api/notice'

export default {
  name: 'Header',
  components: {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    HeaderMenu,
    ElPopover: Popover,
    ElTable: Table,
    ElTableColumn: TableColumn,
    Pagination
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      notices: [],
      total: 0,
      page: 1,
      limit: 10
    }
  },
  mounted () {
    this.getNotices()
  },
  methods: {
    handleChangePagination (page) {
      this.page = page
      this.getNotices()
    },
    async getNotices () {
      const params = {
        page: this.page,
        limit: this.limit
      }
      const { data } = await getNotices(params)
      this.notices = data.list
      this.total = data.total
    },
    handleSelect (index) {
      if (index === 2) {
        this.handleLogOut()
      }
      if (index === 1) {
        this.$router.push({ path: '/profile' })
      }
    },
    handleLogOut () {
      this.$store.dispatch('RestToken')
      this.$router.replace({ path: '/sign-in' })
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
