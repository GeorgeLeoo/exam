<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 11:08 PM
-->
<template>
  <div class="check-box-group">
    <h4 :class="isSelect ? 'title blue' : 'title'">{{title}}</h4>
    <div class="check-box-list">
      <check-box v-for="index in data" :key="index" :value="index" :prop="prop" :checked="index === key" :finished="finishedList.includes(index)" @prop="handleProp" @check="handleChecked(index)" />
    </div>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox'
export default {
  name: 'CheckBoxGroup',
  components: {
    CheckBox
  },
  props: {
    finishedList: {
      type: Array,
      default: () => []
    },
    data: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    checkIndex: {
      type: Number,
      default: -1
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      key: -1
    }
  },
  watch: {
    checkIndex (val) {
      this.key = val
    }
  },
  mounted () {
    this.key = this.checkIndex
  },
  methods: {
    handleProp (prop) {
      this.key = this.checkIndex
      this.$emit('prop', prop)
    },
    handleChecked (index) {
      this.key = index
      this.$emit('check', index)
    }
  }
}
</script>

<style scoped lang="scss">
.check-box-group{
  .title{
    font-size:14px;
    color:rgba(96,98,102,1);
    margin-top: 32px;
    margin-bottom: 22px;
  }
  .blue {
    color: #409eff;
  }
  .check-box-list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
