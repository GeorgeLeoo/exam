<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 8:44 PM
-->
<template>
  <div
    v-loading="loadingPaper"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    class="examing"
  >
    <examing-head :data="examHeadData" @time-over="handleTimeOver"/>
    <div class="paper">
      <div class="item menu fl">
        <div class="head">
          <h3 class="title">答题卡</h3>
          <span class="text">已答</span>
          <i class="state check"/>
          <span class="text">未答</span>
          <i class="state uncheck"/>
          <span class="text">已选</span>
          <i class="state selected"/>
        </div>
        <div class="checkbox-wrapper">
          <check-box-group ref="singleGroup" :checkIndex="singleCheckIndex + 1" prop="single"
                           :is-select="select === 'single'" :data="paperData.single && paperData.single.length"
                           title="一、单选题"
                           :finished-list="finishedSingleList" @prop="handleProp" @check="handleCheck"/>
          <check-box-group ref="multipleGroup" :checkIndex="multipleCheckIndex + 1" prop="multiple"
                           :is-select="select === 'multiple'" :data="paperData.multiple && paperData.multiple.length"
                           title="二、多选题"
                           :finished-list="finishedMultipleList" @prop="handleProp" @check="handleCheck"/>
          <check-box-group ref="judgeGroup" :checkIndex="judgeCheckIndex + 1" prop="judge"
                           :is-select="select === 'judge'" :data="paperData.judge && paperData.judge.length"
                           title="三、判断题"
                           :finished-list="finishedJudgeList" @prop="handleProp" @check="handleCheck"/>
          <check-box-group ref="completionGroup" :checkIndex="completionCheckIndex + 1" prop="completion"
                           :is-select="select === 'completion'"
                           :data="paperData.completion && paperData.completion.length" title="四、填空题"
                           :finished-list="finishedCompletionList" @prop="handleProp" @check="handleCheck"/>
          <check-box-group ref="afqGroup" :checkIndex="afqCheckIndex + 1" prop="afq" :is-select="select === 'afq'"
                           :data="paperData.afq && paperData.afq.length" title="五、主观题"
                           :finished-list="finishedAFQList" @prop="handleProp" @check="handleCheck"/>
        </div>
        <div class="divider"></div>
        <div class="submit-paper-wrapper">
          <el-button type="primary" @click="handleSubmitPaper">我要交卷</el-button>
        </div>
      </div>
      <div class="item content fl">
        <div class="head">
          <h3 class="title">一、单选题<span class="sub-title">（1分/题）</span></h3>
        </div>
        <div v-if="questionList.length > 0" class="question-wrapper">
          <h4 class="question">{{ questionIndex + 1 }}. {{ questionList[questionIndex].question }}</h4>
          <q-check-box-group v-if="select === 'single' || select === 'judge'"
                             :data="questionList[questionIndex].options"
                             :index="(questionList[questionIndex].answer).toUpperCase().charCodeAt() - 65"
                             @select="handleSelected"/>
          <q-check-box-multiple-group v-else-if="select === 'multiple'" :data="questionList[questionIndex].options"
                                      :index="questionList[questionIndex].answer"
                                      @select="handleSelected"></q-check-box-multiple-group>
          <div v-else>
            <el-input
              v-model="questionList[questionIndex].answer"
              type="textarea"
              placeholder="请输入答案"
              style="width: 100%;"
            />
          </div>
        </div>
        <div class="prev-next-btn">
          <el-button v-show="showPrev" plain @click="handlePrev">上一题</el-button>
          <el-button v-show="showNext" type="primary" @click="handleNext">下一题</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="警告"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您刚才离开过考试了，还有{{ times }}次机会了</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="强制交卷"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :visible.sync="forceSubmitDialogVisible"
      width="30%">
      <span>由于您离开了3次，现在强制交卷，有异议联系管理员</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="forceSubmitPaper">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ExamingHead from '@/components/ExamingHead'
import QCheckBoxGroup from '@/components/QCheckBoxGroup'
import QCheckBoxMultipleGroup from '@/components/QCheckBoxMultipleGroup'
import CheckBoxGroup from '@/components/CheckBoxGroup'
import { getPaperById } from '../../api/paper'
import { getDurationTime } from '../../filters'
import { addAnswer } from '../../api/exam'
import { Button, Dialog, Input, MessageBox } from 'element-ui'

export default {
  name: 'Examing',
  components: {
    ExamingHead,
    QCheckBoxGroup,
    QCheckBoxMultipleGroup,
    CheckBoxGroup,
    ElButton: Button,
    ElDialog: Dialog,
    ElInput: Input
  },
  data () {
    return {
      loadingText: '正在生成试卷中',
      answer: '',
      options: ['single', 'multiple', 'judge'],
      questionIndex: 0,
      loadingPaper: false,
      times: 3,
      maxTime: 3,
      paperData: {},
      showNext: true,
      showPrev: false,
      dialogVisible: false,
      forceSubmitDialogVisible: false,
      finishedSingleList: [],
      finishedMultipleList: [],
      finishedJudgeList: [],
      finishedCompletionList: [],
      finishedAFQList: [],
      examHeadData: {},
      qCheckBoxList: [],
      questionList: [],
      questionSingleList: [],
      questionMultipleList: [],
      questionJudgeList: [],
      questionCompletionList: [],
      questionAFQList: [],
      flgs: [],
      select: 'single',
      selectList: {
        single: 'questionSingleList',
        multiple: 'questionMultipleList',
        judge: 'questionJudgeList',
        completion: 'questionCompletionList',
        afq: 'questionAFQList'
      },
      singleCheckIndex: 0,
      multipleCheckIndex: -1,
      judgeCheckIndex: -1,
      completionCheckIndex: -1,
      afqCheckIndex: -1,
      completion: {
        score: 0,
        list: []
      },
      single: {
        score: 0,
        list: []
      },
      multiple: {
        score: 0,
        list: []
      },
      judge: {
        score: 0,
        list: []
      },
      afq: {
        score: 0,
        list: []
      },
      user: '',
      paper: ''
    }
  },
  computed: {
    ...mapGetters(['getPaperId', 'getUsername', 'getUID'])
  },
  watch: {
    questionIndex (val) {
      if (this.select === 'single') {
        this.singleCheckIndex = val
      }
      if (this.select === 'multiple') {
        this.multipleCheckIndex = val
      }
      if (this.select === 'judge') {
        this.judgeCheckIndex = val
      }
      if (this.select === 'completion') {
        this.completionCheckIndex = val
      }
      if (this.select === 'afq') {
        this.afqCheckIndex = val
      }
    }
  },
  mounted () {
    this.forbid()
    this.listeningPage()
    this.getPaperQuestion()
  },
  beforeDestroy () {
    localStorage.removeItem('PAPER_ID')
    // this.handleSubmitPaper()
    alert('111')
  },
  methods: {
    async addAnswer () {
      this.loadingText = '正在交卷，请稍后...'
      this.loadingPaper = true
      const data = {
        single: this.questionSingleList,
        multiple: this.questionMultipleList,
        judge: this.questionJudgeList,
        completion: this.questionCompletionList,
        afq: this.questionAFQList,
        user: this.getUID,
        paper: localStorage.getItem('PAPER_ID'),
        paperType: this.paperData.paperType,
        singleScore: this.paperData.singleScore,
        multipleScore: this.paperData.multipleScore,
        judgeScore: this.paperData.judgeScore,
        completionScore: this.paperData.completionScore,
        afqScore: this.paperData.afqScore
      }
      if (this.paperData.paperType === 1) {
        data.singleNumber = this.paperData.singleNumber
        data.multipleNumber = this.paperData.multipleNumber
        data.judgeNumber = this.paperData.judgeNumber
        data.completionNumber = this.paperData.completionNumber
        data.afqNumber = this.paperData.afqNumber
      }
      await addAnswer(data)
      this.loadingText = '交卷成功，3s后将返回首页'
      // setTimeout(() => {
      // }, 3000)
      this.loadingPaper = false
      this.loadingText = '正在生成试卷中'
      localStorage.removeItem('PAPER_ID')
      this.$router.back()
    },
    handleMultipleSelected (keys) {
      console.log(keys)
    },
    handleCheck (index) {
      this.questionIndex = index - 1
    },
    handleProp (prop) {
      this.select = prop
      this.questionList = this[this.selectList[prop]]
      if (this.questionIndex === 0) {
        this.showPrev = false
        this.showNext = true
      } else {
        this.showPrev = true
        this.showNext = true
      }
      if (prop === 'single') {
        this.singleCheckIndex = 0
        this.multipleCheckIndex = -1
        this.judgeCheckIndex = -1
        this.completionCheckIndex = -1
        this.afqCheckIndex = -1
        if (this.questionIndex === this.questionSingleList.length - 1) {
          this.showPrev = true
          this.showNext = false
        }
      }
      if (prop === 'multiple') {
        this.singleCheckIndex = -1
        this.multipleCheckIndex = 0
        this.judgeCheckIndex = -1
        this.completionCheckIndex = -1
        this.afqCheckIndex = -1
        if (this.questionIndex === this.questionMultipleList.length - 1) {
          this.showPrev = true
          this.showNext = false
        }
      }
      if (prop === 'judge') {
        this.singleCheckIndex = -1
        this.multipleCheckIndex = -1
        this.judgeCheckIndex = 0
        this.completionCheckIndex = -1
        this.afqCheckIndex = -1
        if (this.questionIndex === this.questionJudgeList.length - 1) {
          this.showPrev = true
          this.showNext = false
        }
      }
      if (prop === 'completion') {
        this.singleCheckIndex = -1
        this.multipleCheckIndex = -1
        this.judgeCheckIndex = -1
        this.completionCheckIndex = 0
        this.afqCheckIndex = -1
        if (this.questionIndex === this.questionCompletionList.length - 1) {
          this.showPrev = true
          this.showNext = false
        }
      }
      if (prop === 'afq') {
        this.singleCheckIndex = -1
        this.multipleCheckIndex = -1
        this.judgeCheckIndex = -1
        this.completionCheckIndex = -1
        this.afqCheckIndex = 0
        if (this.questionIndex === this.questionMultipleList.length - 1) {
          this.showPrev = true
          this.showNext = false
        }
      }

      this.questionSingleList && this.questionSingleList.length > 0 && this.questionSingleList.map((item, index) => item.answer && !this.finishedSingleList.includes(index + 1) && this.finishedSingleList.push(index + 1))
      this.questionMultipleList && this.questionMultipleList.length > 0 && this.questionMultipleList.map((item, index) => item.answer.length > 0 && !this.finishedMultipleList.includes(index + 1) && this.finishedMultipleList.push(index + 1))
      this.questionJudgeList && this.questionJudgeList.length > 0 && this.questionJudgeList.map((item, index) => item.answer && !this.finishedJudgeList.includes(index + 1) && this.finishedJudgeList.push(index + 1))
      this.questionCompletionList && this.questionCompletionList.length > 0 && this.questionCompletionList.map((item, index) => item.answer && !this.finishedCompletionList.includes(index + 1) && this.finishedCompletionList.push(index + 1))
      this.questionAFQList && this.questionAFQList.length > 0 && this.questionAFQList.map((item, index) => item.answer && !this.finishedAFQList.includes(index + 1) && this.finishedAFQList.push(index + 1))
    },
    handleNext () {
      this.questionIndex++
      this.showPrev = true
      if (this.questionIndex === this.questionList.length - 1) {
        this.showNext = false
      }
    },
    handlePrev () {
      this.questionIndex--
      this.showNext = true
      if (this.questionIndex === 0) {
        this.showPrev = false
      }
    },
    handleTimeOver () {
      MessageBox.confirm(
        '时间已到，即将自动交卷',
        '自动交卷？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        localStorage.removeItem('PAPER_ID')
        this.$router.back()
      })
    },
    forbid () {
      document.oncontextmenu = () => { return false }
    },
    getPaperQuestion () {
      this.getPaperById()
    },
    /**
       * 监听刘页面事件
       */
    listeningPage () {
      // 监听浏览器失去焦点
      window.addEventListener('blur', () => {
        this.dialogVisible = true
        this.times--
        this.times === 0 && this.showForceSubmitDialog()
      })
    },
    /**
       * 通过id获取试卷信息
       * @returns {Promise<void>}
       */
    async getPaperById () {
      this.loadingPaper = true
      const { data } = await getPaperById(localStorage.getItem('PAPER_ID'), localStorage.getItem('PAPER_TYPE') === '0' ? 'FIXED' : 'RANDOM', this.getUID)
      this.paperData = data
      this.examHeadData = {
        paperName: data.paperName,
        username: this.getUsername,
        testType: data.testType,
        startTime: getDurationTime(data)
      }
      data.single.map(item => {
        this.questionSingleList.push({
          original: item,
          score: 0,
          answer: '',
          question: item.question,
          options: [
            {
              value: item.a
            },
            {
              value: item.b
            },
            {
              value: item.c
            },
            {
              value: item.d
            }
          ]
        })
      })
      data.multiple.map(item => {
        this.questionMultipleList.push({
          original: item,
          score: 0,
          answer: [],
          question: item.question,
          options: [
            {
              value: item.a
            },
            {
              value: item.b
            },
            {
              value: item.c
            },
            {
              value: item.d
            }
          ]
        })
      })
      data.judge.map(item => {
        this.questionJudgeList.push({
          original: item,
          score: 0,
          answer: '',
          question: item.question,
          options: [
            {
              value: '正确'
            },
            {
              value: '错误'
            }
          ]
        })
      })
      data.completion.map(item => {
        this.questionCompletionList.push({
          original: item,
          score: 0,
          answer: '',
          question: item.question
        })
      })
      data.afq.map(item => {
        this.questionAFQList.push({
          original: item,
          score: 0,
          answer: '',
          question: item.question
        })
      })
      this.questionList = this.questionSingleList
      this.loadingPaper = false
    },
    showForceSubmitDialog () {
      this.forceSubmitDialogVisible = true
    },
    /**
       * 强制交卷
       */
    forceSubmitPaper () {
      this.$router.back()
    },
    /**
       * 提交试卷
       */
    handleSubmitPaper () {
      MessageBox.confirm(
        '一旦交卷就不能在作答或修改答案',
        '确认交卷？',
        {
          confirmButtonText: '确定提交',
          cancelButtonText: '继续答题',
          type: 'warning'
        }
      ).then(() => {
        this.addAnswer()
      })
    },
    handleSelected (val) {
      const prop = this.select
      this.questionList[this.questionIndex].answer = val
      if (prop === 'single') {
        this.single.list.push({
          answer: val,
          question: this.paperData.single[this.questionIndex]
        })
      }
      if (prop === 'multiple') {
        this.multiple.list.push({
          answer: val,
          question: this.paperData.multiple[this.questionIndex]
        })
      }
      if (prop === 'judge') {
        this.judge.list.push({
          answer: val,
          question: this.paperData.judge[this.questionIndex]
        })
      }
      if (prop === 'completion') {
        this.completion.list.push({
          answer: val,
          question: this.paperData.completion[this.questionIndex]
        })
      }
      if (prop === 'afq') {
        this.afq.list.push({
          answer: val,
          question: this.paperData.afq[this.questionIndex]
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .examing {
    user-select: none;
    height: 100vh;

    .paper {
      margin: -128px 54px 0;
      position: relative;
      z-index: 9;

      .item {
        height: calc(100vh - 132px);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 0 12px 0 rgba(0, 0, 0, 0.12);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border: 1px solid rgba(238, 238, 238, 1);
        padding: 32px;

        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 36px;
          border-bottom: 1px solid #EBEEF5;

          .title {
            font-size: 30px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            display: inline-block;
            margin-right: 16px;
          }

          .sub-title {
            color: rgba(144, 147, 153, 1);
          }

          .text {
            display: inline-block;
            font-size: 14px;
            color: rgba(96, 98, 102, 1);
            margin-right: 12px;
          }

          .state {
            display: inline-block;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            margin-right: 10px;
          }

          .check {
            background: rgba(64, 158, 255, 1);
            border: 1px solid rgba(64, 158, 255, 1);
          }

          .uncheck {
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(151, 151, 151, 1);
          }

          .selected {
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(64, 158, 255, 1);
            margin-right: 0;
          }
        }
      }

      .menu {
        width: 360px;
        margin-right: 32px;

        .checkbox-wrapper {
          height: calc(100vh - 390px);
          overflow: auto;
        }

        .divider {
          height: 32px;
          border-bottom: 1px solid #EBEEF5;
        }

        .submit-paper-wrapper {
          text-align: center;
          padding: 32px;

          .el-button {
            width: 200px;
          }
        }
      }

      .content {
        width: calc(100% - 392px);
        position: relative;

        .question {
          margin-top: 32px;
          font-size: 14px;
          line-height: 28px;
        }

        .el-textarea__inner {
          height: 200px;
          resize: none
        }

        .prev-next-btn {
          position: absolute;
          bottom: 36px;
          right: 36px;

          .el-button {
            width: 200px;
          }
        }
      }
    }
  }
</style>
