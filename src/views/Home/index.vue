<template>
  <section class="home wrapper1024">
    <Alert
      class="alert"
      title="成功提示的文案"
      type="success">
    </Alert>
    <article class="clearfix">
      <HomeLeft class="fl" />
      <HomeRight class="fl gap" />
    </article>
  </section>
</template>

<script>
import HomeLeft from './home-left'
import HomeRight from './home-right'
import { Alert } from 'element-ui'

export default {
  name: 'Home',
  components: {
    HomeLeft,
    HomeRight,
    Alert
  }
}
</script>
<style scoped lang="scss">
  .home{
    padding-top: 16px;
    .alert{
      margin-bottom: 16px;
    }
    .gap{
      margin-left: 16px;
    }
  }
</style>
