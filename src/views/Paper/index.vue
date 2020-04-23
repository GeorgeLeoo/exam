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
          <el-input v-model="paperName" suffix-icon="el-icon-search" placeholder="试卷搜索" @input="handleSearch"/>
        </div>
      </div>
      <list-view v-loading="loading" :is-paper="activeName === tabNames[0].name" :data="listData" @exam="startTest"/>
    </article>
    <el-dialog
      title="考生身份信息确认"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form label-width="100px">
        <el-form-item label="账号：">
          <span>18921483103</span>
        </el-form-item>
        <el-form-item label="手机号：">
          <span>18921483103</span>
        </el-form-item>
        <el-form-item label="考试科目：">
          <span>Java</span>
        </el-form-item>
        <el-form-item label="考试名称：">
          <span>Java面向对象</span>
        </el-form-item>
        <el-form-item label="考试日期：">
          <span>2020-03-04</span>
        </el-form-item>
        <el-form-item label="考试时长：">
          <span>120分钟</span>
        </el-form-item>
      </el-form>
      <div>
        <p>如果您已确认以上信息无误，请点击"开始考试"按钮进入考试；请注意考试纪律，严禁作弊。</p>
      </div>
      <div class="start-exam-btn">
        <el-button type="primary" @click="handleToExaming">开始考试</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { Tabs, TabPane, Input, Dialog, MessageBox, Form, FormItem, Button } from 'element-ui'
import ListView from '../Paper/ListView'
import SideMenu from '@/components/SideMenu'
import { getPapers, getKnowledgePoint } from '../../api/paper'
import { getSubjects } from '../../api/subject'
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
    ElInput: Input,
    ElDialog: Dialog,
    ElForm: Form,
    ElFormItem: FormItem,
    ElButton: Button
  },
  data () {
    return {
      dialogVisible: false,
      loading: false,
      tabNames,
      activeName: tabNames[0].name,
      listData: [],
      subjectList: [],
      paperList: [],
      paperName: '',
      id: '',
      paperId: ''
    }
  },
  created () {
    this.getSubjects()
  },
  methods: {
    startTest (id) {
      this.paperId = id
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
      })
    },
    handleToExaming () {
      this.$router.push({ name: 'Examing', params: { _id: this.paperId } })
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
        type: 'SIMPLE',
        subject: this.id
      }
      this.paperName && (params.paperName = this.paperName)
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

    .start-exam-btn {
      text-align: center;
    }
  }
</style>
