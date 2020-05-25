<template>
  <article class="home-left">
    <div class="user-info clearfix">
      <div class="fl">
        <Avatar class="avatar" shape="square" size="large"
                   src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1305353222,2352820043&fm=26&gp=0.jpg"/>
      </div>
      <div class="fl gap">
        <h4 class="nickname">苏醒</h4>
        <span class="user">11128922</span>
      </div>
    </div>
    <div class="signature">
      <h3 class="label">个性签名：</h3>
      <p class="text">{{ signature }}</p>
    </div>
    <div class="stat">
      <div class="row">
        <div class="item">
          <span class="num">20</span>
          <span class="text">今日答题</span>
        </div>
        <div class="item">
          <span class="num">13</span>
          <span class="text">今日答对</span>
        </div>
        <div class="item">
          <span class="num">7</span>
          <span class="text">今日答错</span>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <span class="num">55</span>
          <span class="text">共答题</span>
        </div>
        <div class="item">
          <span class="num">42</span>
          <span class="text">共答对</span>
        </div>
        <div class="item">
          <span class="num">13</span>
          <span class="text">共答错</span>
        </div>
      </div>
    </div>
    <div class="progress-list">
        <ul>
          <li>
            <h3 class="label">今日正确率</h3>
            <el-progress :text-inside="true" :stroke-width="16" :percentage="70"></el-progress>
          </li>
          <li>
            <h3 class="label">总正确率</h3>
            <el-progress :text-inside="true" :stroke-width="16" :percentage="40"></el-progress>
          </li>
        </ul>
    </div>
    <div class="recent-exam">
      <h4 class="title">我的考试</h4>
      <ul>
        <li class="item" v-for="(item, index) in scoreData" :key="index">
          <span class="paper-name">{{ item.paper && item.paper.paperName }}</span>
          <!--          <span class="paper-score">{{ item.score }}分</span>-->
          <span class="paper-time">{{ item.paper.createdAt | parseTime }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import { Avatar, Progress } from 'element-ui'
import { getScore } from '../../api/score'
export default {
  name: 'HomeLeft',
  components: {
    Avatar,
    ElProgress: Progress
  },
  data () {
    return {
      signature: '个性签名个性签名个性签名个性签名\n' +
        '个性签名个性签名个性签名',
      scoreData: []
    }
  },
  mounted () {
    this.getScore()
  },
  methods: {
    async getScore () {
      const params = {
        page: 1,
        limit: 5
      }
      const res = await getScore(params)
      this.scoreData = res.data.list
    }
  }
}
</script>

<style scoped lang="scss">
  .home-left {
    width: 270px;
    border-right: 1px solid rgba(151,151,151,0.3);
    .gap {
      margin-left: 16px;
    }
    .user-info{
      padding-left: 16px;
      .nickname{
        font-size:16px;
        color:rgba(109,114,120,1);
        line-height:32px;
      }
      .user{
        font-size:14px;
        color:rgba(144,147,153,1);
        line-height:22px;
      }
      .avatar {
        height: 60px;
        width: 60px;
      }
    }
    .signature{
      margin-top: 28px;
      padding-left: 16px;
      padding-bottom: 16px;
      margin-right: 16px;
      border-bottom: 1px solid #EBEEF5;
      .label{
        font-size:16px;
        color:rgba(109,114,120,1);
        line-height:22px;
        margin-bottom: 10px;
      }
      .text{
        font-size:14px;
        color:rgba(109,114,120,1);
        line-height:20px;
      }
    }
    .stat{
      padding-top: 16px;
      .row{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        .item{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 16px;
          .num{
            font-size:20px;
            color:rgba(109,114,120,1);
          }
          .text{
            font-size:14px;
            color:rgba(109,114,120,1);
          }
        }
      }
    }
    .progress-list{
      padding: 0 16px 16px;

      .label{
        font-size:16px;
        color:rgba(109,114,120,1);
        line-height:22px;
        padding-bottom: 10px;
        padding-top: 16px;
      }
    }
    .recent-exam{
      margin-top: 16px;
      .title{
        font-size:18px;
        font-weight:500;
        color:rgba(109,114,120,1);
        line-height:25px;
        padding-left: 16px;
      }
      .item{
        font-size:16px;
        padding:0 16px;
        font-weight:400;
        color:rgba(109,114,120,1);
        line-height:32px;
        cursor: pointer;
        &:hover {
          background: rgba(64,158,255,0.1);
        }
      }
      .paper-name{
      }
      .paper-time{
        float: right;
      }
      .paper-score {
        color: #E02020;
        padding-left: 12px;
      }
    }

  }
</style>
