<template>
  <section class="score wrapper1024">
    <tabs v-model="activeName" @tab-click="handleTabChange">
      <tab-pane label="全部" name="-1"/>
      <tab-pane label="已批改" name="0"/>
      <tab-pane label="未批改" name="1"/>
    </tabs>
    <list-view v-loading="loading" :data="listData" @show-paper="showPaper"/>
    <el-dialog
      :visible.sync="dialogVisible"
      title="查看试卷"
      width="1024px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="handleCancel"
    >
      <div>
        <h3 class="paper-name">
          {{ answer.paper ? answer.paper.paperName : '' }}
        </h3>
        <p class="subject-name">
          {{ answer.subject ? answer.subject.name : '' }}
        </p>
        <p class="subject-name">
          考试时间：{{ answer.paper ? answer.paper.startTime : '' }} - {{ answer.paper ? answer.paper.endTime : '' }}
        </p>
        <p class="subject-name">
          考试时长：{{ answer.paper ? answer.paper : '' | getDurationTime }}
        </p>
      </div>
      <div
        v-loading="isLoading"
        class="paper-dialog-list paper-question"
      >
        <Single
          :data="answer.answer ? answer.answer.single : ''"
          :score="answer.paper ? answer.paper.singleScore : ''"
        />
        <Multiple
          :data="answer.answer ? answer.answer.multiple : ''"
          :score="answer.answer ? answer.answer.multipleScore : ''"
        />
        <Judge
          :data="answer.answer ? answer.answer.judge : ''"
          :score="answer.answer ? answer.answer.judgeScore : ''"
        />
        <Completion
          :data="answer.answer ? answer.answer.completion : ''"
          :score="answer.answer ? answer.answer.completionScore : ''"
        />
        <AFQ
          :data="answer.answer ? answer.answer.afq : ''"
          :score="answer.answer ? answer.answer.afqScore : ''"
        />
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleCancel"
        >确定</el-button>
      </span>
    </el-dialog>
    <pagination
      v-show="total > limit"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      background
      layout="prev, pager, next"
      @current-change="getList"
    />
  </section>
</template>

<script>
import { Tabs, TabPane, Dialog, Button, Pagination } from 'element-ui'
import ListView from './ListView'
import { getScore } from '@/api/score'
import Single from '@/components/Single/index.vue'
import Multiple from '@/components/Multiple/index.vue'
import Judge from '@/components/Judge/index.vue'
import Completion from '@/components/Completion/index.vue'
import AFQ from '@/components/AFQ/index.vue'

export default {
  name: 'Score',
  components: {
    Tabs,
    TabPane,
    Pagination,
    ElDialog: Dialog,
    ElButton: Button,
    ListView,
    Single,
    Multiple,
    Judge,
    Completion,
    AFQ
  },
  data () {
    return {
      answer: {},
      dialogVisible: false,
      loading: false,
      isLoading: false,
      activeName: '-1',
      listData: [],
      page: 1,
      limit: 10,
      total: 0
    }
  },
  mounted () {
    this.getScore()
  },
  methods: {
    handleCancel () {
      this.dialogVisible = false
    },
    getList (page) {
      this.page = page
      this.getScore()
    },
    async getScore () {
      this.loading = true
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.activeName && this.activeName !== '-1' && (params.status = Number(this.activeName))
      const res = await getScore(params)
      this.listData = res.data.list
      this.total = res.data.total
      this.loading = false
    },
    /**
     * tab按钮改变事件
     */
    handleTabChange () {
      this.getScore()
    },
    showPaper (item) {
      this.dialogVisible = true
      this.answer = item
    }
  }
}
</script>

<style lang="scss">
  .score {
    margin-top: 16px;
    .paper-dialog-list{
      height: calc(100vh - 600px);
      overflow: auto;
    }
    .paper-question {
      padding: 0 16px;
    }
    .paper-name {
      text-align: center;
      margin-top: 0;
      font-size: 28px;
    }
    .subject-name {
      text-align: center;
    }
    .fixedInput100 {
      width: 100%;
    }
    .fixedFormDifficulty{
      margin-top: 8px;
    }
    .padding{
      padding-left: 20px;
      padding-right: 10px;
      color: #1f2d3d;
      font-weight: 700;
    }
    .total-score {
      padding: 0 20px;
    }
    .el-checkbox__label {
      width: 550px;
      display: inline-grid;
      white-space: pre-line;
      word-wrap: break-word;
      overflow: hidden;
      line-height: 26px;
    }
    .w100 {
      width: 100%!important;
      margin-bottom: 14px;
    }
    .selected-question {
      margin-left: 16px;
    }
  }
</style>
