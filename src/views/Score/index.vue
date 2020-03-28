<template>
  <section class="score wrapper1024">
    <tabs v-model="activeName" @tab-click="handleTabChange">
      <tab-pane label="全部" name="first"/>
      <tab-pane label="已批改" name="second"/>
      <tab-pane label="未批改" name="third"/>
    </tabs>
    <list-view :data="listData" @show-paper="showPaper"/>
  </section>
</template>

<script>
import { Tabs, TabPane } from 'element-ui'
import ListView from './ListView'
import { getScore } from '@/api/score'

export default {
  name: 'Score',
  components: {
    Tabs,
    TabPane,
    ListView
  },
  data () {
    return {
      activeName: 'first',
      listData: []
    }
  },
  mounted () {
    this.getScore()
  },
  methods: {
    async getScore () {
      const res = await getScore()
      this.listData = res.data.list
    },
    /**
     * tab按钮改变事件
     */
    handleTabChange () {
      console.log(this.activeName)
    },
    showPaper (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss">
  .score {
    margin-top: 16px;
  }
</style>
