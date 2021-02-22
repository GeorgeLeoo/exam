<script>
export default {
  props: {
    title: String,
    name: {
      type: [String, Number],
      default: -1
    }
  },
  data () {
    return {
      index: -1
    }
  },
  watch: {
    index (val) {
      if (val !== this.name) {

      }
    }
  },
  render () {
    return (
      <div class="tab">
        <span class="tab-title">
          { this.title }
        </span>
      </div>
    )
  },
  mounted () {
    // console.log(this.$slots)
  }
}
</script>

<style lang="scss">
.tab {
  display: inline-block;
  width: 100px;
  text-align: center;
  height: 50px;
  cursor: pointer;
}
</style>
