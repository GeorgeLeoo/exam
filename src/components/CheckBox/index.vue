<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 11:01 PM
-->
<template>
  <div class="check-box" :class="[checked ? 'checked' : '', !checked && finished ? 'finished' : '']" @click="handleClick">{{ value }}</div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    value: {
      type: Number,
      default: 0
    },
    checked: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    prop: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick () {
      this.$emit('check')
      this.$emit('prop', this.prop)
    }
  }
}
</script>

<style scoped lang="scss">
  .check-box {
    display: inline-block;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    border: 1px solid rgba(216, 216, 216, 1);
    font-size:14px;
    color:rgba(144,147,153,1);
    line-height: 32px;
    text-align: center;
    margin: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .checked {
    border: 1px solid rgba(64, 158, 255, 1);
    color:rgba(64,158,255,1);
  }

  .finished {
    background:rgba(64,158,255,1);
    border:1px solid rgba(64,158,255,1);
    color: #fff;
  }
</style>
