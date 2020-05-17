<!--
  @Description:
  @Author: George
  @Date: 2020/3/28 10:03 PM
-->
<template>
  <div>
    <q-check-box v-for="(item, i) in data" :key="i" :value="item.value" :checked="multiple ? key.includes(i) : i === key"
                 :label="String.fromCharCode(65 + i)" @select="handleSelected(i)"/>
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
    },
    index: {
      type: Number,
      default: 0
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
        this.key = -1
        this.key = this.index
      },
      deep: true
    }
  },
  mounted () {
    this.key = this.index
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
