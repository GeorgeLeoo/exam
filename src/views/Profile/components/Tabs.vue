<script>
export default {
  data () {
    return {
      contentList: [],
      activeName: 0,
      slots: []
    }
  },
  render () {
    return (
      <div class="tabs">
        <div class="tabs-header">
          {this.$slots.default}
        </div>
        <div class="tabs-container">
          {this.contentList}
        </div>
      </div>
    )
  },
  mounted () {
    this.slots = this.$slots.default
    for (const item of this.slots) {
      const childNode = item.child
      this.contentList.push(childNode.$slots.default)
      item.elm.addEventListener('click', this.handleTab)
    }
  },
  methods: {
    handleTab () {
      this.$emit('tab', this.activeName)
    }
  }
}
</script>

<style>
.tabs-header {

}
</style>
