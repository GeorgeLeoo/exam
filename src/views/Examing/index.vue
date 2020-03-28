<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 8:44 PM
-->
<template>
  <div class="examing">
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
          <el-button type="primary">我要交卷</el-button>
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
  </div>
</template>

<script>
import { Button } from 'element-ui'
import ExamingHead from '@/components/ExamingHead'
import QCheckBoxGroup from '@/components/QCheckBoxGroup'
import CheckBoxGroup from '@/components/CheckBoxGroup'

export default {
  name: 'Examing',
  components: {
    ExamingHead,
    QCheckBoxGroup,
    CheckBoxGroup,
    ElButton: Button
  },
  data () {
    return {
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
  methods: {
    handleSelected (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
  .examing {
    user-select: none;

    .paper {
      margin: -48px 54px 0;
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
        .divider{
          height: 32px;
          border-bottom: 1px solid #EBEEF5;
        }
        .submit-paper-wrapper{
          text-align: center;
          padding: 32px;
          .el-button{
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
