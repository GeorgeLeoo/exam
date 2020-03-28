<!--
  @Description:
  @Author: George
  @Date: 2020/3/26 8:58 PM
-->
<template>
  <ul class="side-menu" :class="data.length === 0 ? 'height' : ''">
    <li class="side-menu-item" v-for="(item, index) in data" :key="index" :class="index === key ? 'menu-selected' : ''" @click="handleItemClick(index, item._id)">{{ item.name }}</li>
  </ul>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      key: 0
    }
  },
  mounted () {
  },
  methods: {
    handleItemClick (index, id) {
      this.key = index
      this.$emit('load-data', id)
    }
  }
}
</script>

<style scoped lang="scss">
.side-menu{
  width: 240px;
  border-right: 1px solid #EBEEF5;
  .side-menu-item{
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    text-align: center;
    &:hover {
      background: rgba(64,158,255,0.3);
    }
  }
  .menu-selected{
    background: rgba(64,158,255,0.3);
  }
  .height {
    width: 240px;
    height: 10px;
  }
}
</style>
