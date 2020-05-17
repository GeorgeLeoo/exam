<template>
  <article class="home-right">
    <!--    <div class="subject">-->
    <!--      <head-more title="热门科目" @more="$router.push('paper')" />-->
    <!--      <div class="subject-container clearfix">-->
    <!--        <div v-for="(item, index) in subjectList" :key="index" class="subject-item">-->
    <!--          <span class="subject-text">{{ item.name }}</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="paper">
      <head-more title="热门试卷" @more="$router.push('paper')" />
      <list-view class="list-view" v-loading="loading" :is-paper="true" :data="paperList" @show-paper="startTest" @exam="startTest" />
    </div>
    <confirm-dialog :data="confirmData" :visible="dialogVisible" @exam="handleToExaming" @close="handleClose"/>
  </article>
</template>

<script>
import { getHotSubjects } from '../../api/home'
import { getHotPapers } from '../../api/paper'
import HeadMore from '@/components/HeadMore'
import ListView from '../Paper/ListView'
import { MessageBox } from 'element-ui'
import ConfirmDialog from './../Paper/ConfirmDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeRight',
  components: {
    HeadMore,
    ListView,
    ConfirmDialog
  },
  data () {
    return {
      subjectList: [],
      paperList: [],
      confirmData: {},
      dialogVisible: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['getUsername', 'getPhone'])
  },
  mounted () {
    // this.getHotSubjects()
    this.getHotPapers()
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    handleToExaming () {
      localStorage.setItem('PAPER_ID', this.paperId)
      localStorage.setItem('PAPER_TYPE', this.paperType)
      this.$router.push({ name: 'Examing' })
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
    /**
     * 获取热门科目信息
     * @returns {Promise<void>}
     */
    async getHotSubjects () {
      const params = {
        limit: 10,
        page: 1
      }
      const res = await getHotSubjects(params)
      this.subjectList = res.data.list
    },
    /**
     * 获取热门试卷信息
     * @returns {Promise<void>}
     */
    async getHotPapers () {
      this.loading = true
      const res = await getHotPapers()
      this.paperList = res.data.list
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  .home-right {
    width: 738px;
    .subject{
      .subject-container{
        padding: 16px 0;
      }
      .subject-item{
        float: left;
        width: 100px;
        height: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid #EBEEF5;
        text-align: center;
        padding: 8px;
        line-height: 100px;
        cursor: pointer;
      }
      .subject-text {
        display: inline-block;
        line-height: 16px;
      }
    }
    .paper {
      .list-view {
        margin-top: 16px;
      }
    }
  }
</style>
