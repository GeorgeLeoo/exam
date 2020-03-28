<!--
  @Description:
  @Author: George
  @Date: 2020/3/23 11:09 PM
-->
<template>
  <ul>
    <template v-if="isPaper">
      <item v-for="(item, index) in data" :key="index" :data="item" @exam="exam"/>
    </template>
    <template v-else>
      <point-item v-for="(item, index) in data" :key="index" :data="item" @exam="exam"/>
    </template>
  </ul>
</template>

<script>
import Item from './Item'
import PointItem from './PointItem'

export default {
  name: 'ListView',
  components: {
    Item,
    PointItem
  },
  props: {
    isPaper: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    exam (id) {
      this.$emit('exam', id)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
