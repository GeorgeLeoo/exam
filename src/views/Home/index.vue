<template>
  <section class="home wrapper1024">
    <Alert
      class="alert"
      :title="notices.content"
      type="success">
    </Alert>
    <article class="clearfix">
      <HomeLeft class="fl"/>
      <HomeRight class="fl gap"/>
    </article>
  </section>
</template>

<script>
import HomeLeft from './home-left'
import HomeRight from './home-right'
import { Alert } from 'element-ui'
import { getNotices } from '../../api/notice'

export default {
  name: 'Home',
  components: {
    HomeLeft,
    HomeRight,
    Alert
  },
  data () {
    return {
      notices: {}
    }
  },
  mounted () {
    this.getNotices()
  },
  methods: {
    async getNotices () {
      const params = {
        page: 1,
        limit: 1
      }
      const { data } = await getNotices(params)
      this.notices = data.list[0]
    }
  }
}
</script>
<style scoped lang="scss">
  .home {
    padding-top: 16px;

    .alert {
      margin-bottom: 16px;
    }

    .gap {
      margin-left: 16px;
    }
  }
</style>
