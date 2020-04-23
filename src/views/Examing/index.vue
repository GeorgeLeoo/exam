<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 8:44 PM
-->
<template>
  <div
    v-loading="loadingPaper"
    element-loading-text="正在生成试卷中"
    element-loading-spinner="el-icon-loading"
    class="examing"
  >
    <examing-head :data="examHeadData"/>
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
          <check-box-group :data="20" title="一、单选题" :finished-list="finishedList"/>
          <check-box-group :data="20" title="一、单选题" :finished-list="finishedList"/>
          <check-box-group :data="20" title="一、单选题" :finished-list="finishedList"/>
          <check-box-group :data="20" title="一、单选题" :finished-list="finishedList"/>
          <check-box-group :data="20" title="一、单选题" :finished-list="finishedList"/>
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
        <div class="question-wrapper">
          <h4 class="question">1. 下列选项中，哪个不属于Java语言的基本数据类型？（ ）</h4>
          <q-check-box-group :data="qCheckBoxList" @select="handleSelected"/>
        </div>
        <div class="prev-next-btn">
          <el-button plain>上一题</el-button>
          <el-button type="primary">下一题</el-button>
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
import { Button, Dialog, MessageBox } from 'element-ui'
import ExamingHead from '@/components/ExamingHead'
import QCheckBoxGroup from '@/components/QCheckBoxGroup'
import CheckBoxGroup from '@/components/CheckBoxGroup'

export default {
  name: 'Examing',
  components: {
    ExamingHead,
    QCheckBoxGroup,
    CheckBoxGroup,
    ElButton: Button,
    ElDialog: Dialog
  },
  data () {
    return {
      loadingPaper: true,
      times: 3,
      maxTime: 3,
      dialogVisible: false,
      forceSubmitDialogVisible: false,
      finishedList: [1, 2, 3, 7, 9, 16, 20],
      examHeadData: {},
      qCheckBoxList: [
        {
          value: '程形就效处心运术备毛矿整标。'
        },
        {
          value: '战张日能广中西新越争采就积导反整得。'
        },
        {
          value: '示克就分花才便许部个地马例。'
        },
        {
          value: '目织改之或同到知米接还马子层院。'
        }
      ]
    }
  },
  mounted () {
    this.forbid()
    this.listeningPage()
    this.getPaperQuestion()
  },
  methods: {
    forbid () {
      document.oncontextmenu = () => { return false }
    },
    getPaperQuestion () {
      this.loadingPaper = true
      setTimeout(() => {
        this.loadingPaper = false
      }, 3000)
    },
    /**
       * 监听刘页面事件
       */
    listeningPage () {
      // 监听页面显示与隐藏
      // document.addEventListener('visibilitychange', () => {
      //   const isHidden = document.hidden
      //   if (isHidden) {
      //     this.dialogVisible = true
      //     this.times--
      //     this.times === 0 && this.showForceSubmitDialog()
      //   }
      // })
      // 监听浏览器失去焦点
      window.addEventListener('blur', () => {
        this.dialogVisible = true
        this.times--
        this.times === 0 && this.showForceSubmitDialog()
      })
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
        this.$router.back()
      })
    },
    handleSelected (val) {
      console.log(val)
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
