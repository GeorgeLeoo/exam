<template>
  <section class="paper wrapper1024 clearfix">
    <div class="clearfix">
      <tabs class="fl paper-tab" v-model="activeName" @tab-click="handleTabChange">
        <tab-pane v-for="(item, index) in tabNames" :key="index" :label="item.label" :name="item.name"/>
      </tabs>
      <div class="fr">
        <el-input v-model="paperName" suffix-icon="el-icon-search" placeholder="试卷搜索" @input="handleSearch"/>
      </div>
    </div>
    <article v-if="activeName === tabNames[0].name" class="clearfix">
      <article class="fl left">
        <side-menu :data="subjectList" @load-data="loadData"/>
      </article>
      <list-view v-loading="loading" class="fl list" :is-paper="activeName === tabNames[0].name" :data="listData"
                 @exam="startTest"/>
      <div class="pagination">
        <pagination
          v-if="total > limit"
          :total="total"
          :page.sync="page"
          :limit.sync="limit"
          background
          layout="prev, pager, next"
          @current-change="getList"
        />
      </div>
    </article>
    <article v-else>
      <article class="fl left">
        <side-menu :data="typeList" @load-data="loadDataByType"/>
      </article>
      <ul v-loading="loading" class="fl list">
        <li v-for="(item, index) in knowledgePointList" :key="item._id + index" class="knowledge-point-list">
          <span>{{ item._id }}（共 {{ item.total }} 题）</span>
          <el-button class="btn" type="primary" @click="handleToTest(item._id)">开始练习</el-button>
        </li>
      </ul>
    </article>
    <confirm-dialog :data="confirmData" :visible="dialogVisible" @exam="handleToExaming" @close="handleClose"/>
  </section>
</template>

<script>
import { Tabs, TabPane, Input, MessageBox, Button, Pagination } from 'element-ui'
import ListView from '../Paper/ListView'
import SideMenu from '@/components/SideMenu'
import ConfirmDialog from './ConfirmDialog'
import {
  getPapers,
  getKnowledgePointBySingle,
  getKnowledgePointByMultiple,
  getKnowledgePointByJudge,
  getKnowledgePointByCompletion,
  getKnowledgePointByAFQ
} from '../../api/paper'
import { getSubjects } from '../../api/subject'
import { mapGetters } from 'vuex'

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
    Pagination,
    ListView,
    SideMenu,
    ElInput: Input,
    ElButton: Button,
    ConfirmDialog
  },
  data () {
    return {
      typeList: [
        {
          name: '单选题',
          _id: '0'
        },
        {
          name: '多选题',
          _id: '1'
        },
        {
          name: '判断题',
          _id: '2'
        },
        {
          name: '填空题',
          _id: '3'
        },
        {
          name: '解答题',
          _id: '4'
        }
      ],
      confirmData: {},
      dialogVisible: false,
      loading: false,
      tabNames,
      activeName: tabNames[0].name,
      listData: [],
      subjectList: [],
      paperList: [],
      knowledgePointList: [],
      paperName: '',
      paperType: '',
      id: '',
      subjectId: '',
      paperId: '',
      total: 0,
      limit: 2,
      page: 1
    }
  },
  computed: {
    ...mapGetters(['getUsername', 'getPhone'])
  },
  created () {
    this.getSubjects()
  },
  methods: {
    getList (page) {
      this.page = page
      if (this.activeName === this.tabNames[0].name) {
        this.loadData()
      }
      if (this.activeName === this.tabNames[1].name) {
        this.loadDataByType()
      }
    },
    async loadDataByType (id) {
      this.id = id
      this.loading = true
      const params = {
        limit: this.limit,
        page: this.page
      }
      const funcs = {
        0: getKnowledgePointBySingle,
        1: getKnowledgePointByMultiple,
        2: getKnowledgePointByJudge,
        3: getKnowledgePointByCompletion,
        4: getKnowledgePointByAFQ
      }
      const res = await funcs[id](params)
      this.knowledgePointList = res.data.list
      this.loading = false
    },
    handleToTest (knowledgePoint) {
      this.$router.push({
        name: 'Test',
        query: {
          knowledgePoint,
          id: this.id
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    startTest (item) {
      this.paperId = item._id
      this.paperType = item.paperType
      this.confirmData.username = this.getUsername
      this.confirmData.phone = this.getPhone
      this.confirmData.paperName = item.paperName
      this.confirmData.subject = item.subject.name
      this.confirmData.startTime = item.startTime
      this.confirmData.endTime = item.endTime
      MessageBox.confirm(
        '您确定进行模拟考试',
        '模拟考试?',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.dialogVisible = true
      }).catch(() => {})
    },
    handleToExaming () {
      localStorage.setItem('PAPER_ID', this.paperId)
      localStorage.setItem('PAPER_TYPE', this.paperType)
      this.$router.push({ name: 'Examing' })
      this.dialogVisible = false
    },
    /**
       * 搜索
       */
    handleSearch () {
      this.getPapers()
    },
    /**
       * 根据科目查询信息
       */
    loadData (id) {
      this.subjectId = id
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
        // this.getKnowledgePoint()
        this.loadDataByType('0')
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
      this.subjectId = res.data.list[0]._id
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
        type: 'SIMPLE',
        subject: this.subjectId
      }
      this.paperName && (params.paperName = this.paperName)
      this.loading = true
      const res = await getPapers(params)
      this.listData = res.data.list
      this.total = res.data.total
      this.loading = false
    },
    /**
       * 获取考点信息
       * @returns {Promise<void>}
       */
    async getKnowledgePoint () {
      // this.loading = true
      // const params = {
      //   limit: 10,
      //   page: 1
      // }
      // this.loading = true
      // const res = await getKnowledgePoint(params)
      // this.knowledgePointList = res.data.list
      // this.loading = false
    }
  }
}
</script>

<style lang="scss">
  .paper {
    margin-top: 16px;
    position: relative;

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

    .list {
      width: 770px;
      margin-left: 10px;
    }

    .knowledge-point-list {
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 6px;
      border: 1px solid rgba(213, 216, 222, 1);
    }

    .btn {
      float: right;
      margin-top: -10px;
    }

    .pagination {
      position: absolute;
      bottom: 20px;
      left: 300px;
    }
  }
</style>
