<!--
  @Description:
  @Author: George
  @Date: 2020/3/22 11:08 AM
-->
<template>
  <div>
    <Header :menu="menuList" />
    <router-view />
  </div>
</template>

<script>
import { menuList } from './settings'
import Header from '@/components/Header'

export default {
  name: 'Layout',
  components: {
    Header
  },
  data () {
    return {
      menuList
    }
  }
}
</script>

<style scoped lang="scss">

</style>
