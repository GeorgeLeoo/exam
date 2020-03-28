<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 10:02 PM
-->
<template>
  <div class="q-check-box" :class="checked ? 'check-border': ''" @click="$emit('select')">
    <div class="label" :class="checked ? 'check-label' : ''">{{ label }}</div>
    <div class="value" :class="checked ? 'check-value' : ''">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'QCheckBox',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'A'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.q-check-box{
  width: 700px;
  border-radius: 6px;
  border: 1px solid rgba(213,216,222,1);
  line-height: 62px;
  margin: 16px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  .label{
    display: inline-block;
    width: 60px;
    text-align: center;
    border-right: 1px solid rgba(213,216,222,1);
    transition: all 0.3s ease;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .value{
    padding-left: 22px;
    display: inline-block;
    transition: all 0.3s ease;
  }
  .check-value{
    color: rgba(64, 158, 255, 1);
  }
  .check-label{
    color: #fff;
    border-right-color:  rgba(64, 158, 255, 1);
    background-color:  rgba(64, 158, 255, 1);
  }
}

.check-border{
  border-color: rgba(64, 158, 255, 1);
}
</style>
