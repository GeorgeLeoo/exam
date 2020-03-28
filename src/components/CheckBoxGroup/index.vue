<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 11:08 PM
-->
<template>
  <div class="check-box-group">
    <h4 class="title">{{title}}</h4>
    <div>
      <check-box v-for="index in data" :key="index" :value="index" :checked="index === key" :finished="finishedList.includes(index)" @check="handleChecked(index)" />
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
      default: () => {}
    },
    data: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      key: -1
    }
  },
  methods: {
    handleChecked (index) {
      this.key = index
      console.log(index)
    }
  }
}
</script>

<style scoped lang="scss">
.check-box-group{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .title{
    font-size:14px;
    color:rgba(96,98,102,1);
    margin-top: 32px;
    margin-bottom: 22px;
  }
}
</style>
