<!--
  @Description:
  @Author: George
  @Date: 2020/3/23 11:09 PM
-->
<template>
  <ul>
    <template v-if="isPaper">
      <p v-if="data.length === 0">暂无数据</p>
      <template v-else>
        <item v-for="(item, index) in data" :key="index" :data="item" @exam="exam(item)"/>
      </template>
    </template>
    <template v-else>
      <p v-if="data.length === 0">暂无数据</p>
      <template v-else>
        <point-item v-for="(item, index) in data" :key="index" :data="item" @exam="exam(item)"/>
      </template>
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
    exam (item) {
      this.$emit('exam', item)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
