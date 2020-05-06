<!--
  @Description:
  @Author: George
  @Date: 2020/3/23 11:09 PM
-->
<template>
  <ul>
    <p v-if="data.length === 0">暂无数据</p>
    <template v-else>
      <Item v-for="(item, index) in data" :key="index" :data="item" @show-paper="showPaper"/>
    </template>
  </ul>
</template>

<script>
import Item from './Item'

export default {
  name: 'ListView',
  components: {
    Item
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    showPaper (id) {
      this.$emit('show-paper', id)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
