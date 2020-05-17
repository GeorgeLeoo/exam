<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 10:03 PM
-->
<template>
  <div>
    <q-check-box v-for="(item, i) in data" :key="i" :value="item.value" :checked="key.includes(i)"
                 :label="String.fromCharCode(65 + i)" @select="handleSelected(i)"/>
  </div>
</template>

<script>
import QCheckBox from '@/components/QCheckBox'

export default {
  name: 'QCheckBoxMultipleGroup',
  components: {
    QCheckBox
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    index: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      key: []
    }
  },
  watch: {
    data: {
      handler () {
        this.key = this.index.map(item => item.toUpperCase().charCodeAt() - 65)
      },
      deep: true
    }
  },
  mounted () {
    this.key = this.index.map(item => item.toUpperCase().charCodeAt() - 65)
  },
  methods: {
    handleSelected (index) {
      this.key.includes(index) ? this.key.splice(this.key.indexOf(index), 1) : this.key.push(index)
      const keys = this.key.map(item => {
        return String.fromCharCode(65 + item).toLocaleLowerCase()
      })
      this.$emit('select', keys)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
