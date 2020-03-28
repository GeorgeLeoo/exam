<!--
  @Description:
  @Author: George
  @Date: 2020/3/22 11:08 AM
-->
<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Layout',
  components: {
    Header
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">

</style>
