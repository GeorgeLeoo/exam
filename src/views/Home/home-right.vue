<template>
  <article class="home-right">
    <div class="subject">
      <head-more title="热门科目" @more="$router.push('paper')" />
      <div class="subject-container clearfix">
        <div v-for="(item, index) in subjectList" :key="index" class="subject-item">
          <span class="subject-text">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="paper">
      <head-more title="热门试卷" @more="$router.push('paper')" />
      <list-view class="list-view" v-loading="loading" :is-paper="true" :data="paperList" @show-paper="startTest"/>
    </div>
  </article>
</template>

<script>
import { getHotSubjects, getHotPapers } from '../../api/home'
import HeadMore from '@/components/HeadMore'
import ListView from '../Paper/ListView'

export default {
  name: 'HomeRight',
  components: {
    HeadMore,
    ListView
  },
  data () {
    return {
      subjectList: [],
      paperList: [],
      loading: false
    }
  },
  mounted () {
    // this.getHotSubjects()
    // this.getHotPapers()
  },
  methods: {
    startTest () {},
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
      const params = {
        limit: 10,
        page: 1
      }
      this.loading = true
      const res = await getHotPapers(params)
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
