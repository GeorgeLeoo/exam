<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 10:03 PM
-->
<template>
  <div>
    <q-check-box v-for="(item, index) in data" :key="index" :value="item.value" :checked="multiple ? key.includes(index) : index === key"
                 :label="String.fromCharCode(65 + index)" @select="handleSelected(index)"/>
  </div>
</template>

<script>
import QCheckBox from '@/components/QCheckBox'

export default {
  name: 'QCheckBoxGroup',
  components: {
    QCheckBox
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      key: []
    }
  },
  mounted () {
    if (!this.multiple) {
      this.key = -1
    }
  },
  methods: {
    handleSelected (index) {
      if (this.multiple) {
        this.key.includes(index) ? this.key.splice(this.key.indexOf(index), 1) : this.key.push(index)
        const keys = this.key.map(item => {
          return String.fromCharCode(65 + item).toLocaleLowerCase()
        })
        this.$emit('select', keys)
      } else {
        this.key = index
        this.$emit('select', String.fromCharCode(65 + index).toLocaleLowerCase())
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
