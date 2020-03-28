<template>
  <section class="paper wrapper1024 clearfix">
    <article class="fl left">
      <side-menu :data="subjectList" @load-data="loadData"/>
    </article>
    <article class="fl gap right">
      <div class="clearfix">
        <tabs class="fl paper-tab" v-model="activeName" @tab-click="handleTabChange">
          <tab-pane v-for="(item, index) in tabNames" :key="index" :label="item.label" :name="item.name"/>
        </tabs>
        <div class="fr">
          <el-input v-model="paperName" suffix-icon="el-icon-search" placeholder="试卷搜索" @change="handleSearch"/>
        </div>
      </div>
      <list-view v-loading="loading" :is-paper="activeName === tabNames[0].name" :data="listData" @show-paper="startTest"/>
    </article>
  </section>
</template>

<script>
import { Tabs, TabPane, Input } from 'element-ui'
import ListView from '../Paper/ListView'
import SideMenu from '@/components/SideMenu'
import { getSubjects, getPapers, getKnowledgePoint } from '../../api/paper'
const tabNames = [{
  label: '试卷',
  name: 'paper'
}, {
  label: '考点',
  name: 'point'
}]

export default {
  name: 'Paper',
  components: {
    Tabs,
    TabPane,
    ListView,
    SideMenu,
    ElInput: Input
  },
  data () {
    return {
      loading: false,
      tabNames,
      activeName: tabNames[0].name,
      listData: [],
      subjectList: [],
      paperList: [],
      paperName: '',
      id: ''
    }
  },
  created () {
    this.getSubjects()
  },
  methods: {
    startTest () {},
    /**
       * 搜索
       */
    handleSearch () {
      console.log(11)
    },
    /**
       * 根据科目查询信息
       */
    loadData (id) {
      this.id = id
      this.tabData()
    },
    /**
       * tab按钮改变事件
       */
    handleTabChange () {
      this.tabData()
    },
    tabData () {
      if (this.activeName === this.tabNames[0].name) {
        this.getPapers()
      }
      if (this.activeName === this.tabNames[1].name) {
        this.getKnowledgePoint()
      }
    },
    showPaper (id) {
      console.log(id)
    },
    /**
       * 获取科目信息
       * @returns {Promise<void>}
       */
    async getSubjects () {
      const params = {
        limit: 10,
        page: 1
      }
      const res = await getSubjects(params)
      this.subjectList = res.data.list
      this.id = res.data.list[0]._id
      this.getPapers()
    },
    /**
       * 获取试卷信息
       * @returns {Promise<void>}
       */
    async getPapers () {
      const params = {
        limit: 10,
        page: 1,
        _id: this.id
      }
      this.loading = true
      const res = await getPapers(params)
      this.listData = res.data.list
      this.loading = false
    },
    /**
       * 获取考点信息
       * @returns {Promise<void>}
       */
    async getKnowledgePoint () {
      const params = {
        limit: 10,
        page: 1,
        _id: this.id
      }
      this.loading = true
      const res = await getKnowledgePoint(params)
      this.listData = res.data.list
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
  .paper {
    margin-top: 16px;

    .gap {
      margin-left: 20px;
    }

    .left {
      width: 240px;
    }

    .right {
      width: 764px;
    }

    .paper-tab {
      width: 100px;
    }
  }
</style>
