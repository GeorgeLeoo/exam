<!--
  @Description:
  @Author: George
  @Date: 2020/5/4 5:26 PM
-->
<template>
  <div class="test">
    <Single
      v-if="type === '0'"
      :data="list"
      :is-test="true"
      @wrong="handleAddWrong"
    />
    <Multiple
      v-if="type === '1'"
      :data="list"
      :is-test="true"
      @wrong="handleAddWrong"
    />
    <Judge
      v-if="type === '2'"
      :data="list"
      :is-test="true"
      @wrong="handleAddWrong"
    />
    <Completion
      v-if="type === '3'"
      :data="list"
      :is-test="true"
      @wrong="handleAddWrong"
    />
    <AFQ
      v-if="type === '4'"
      :data="list"
      :is-test="true"
      @wrong="handleAddWrong"
    />
  </div>
</template>
<script>
import { getAFQs, getCompletions, getJudges, getMultiples, getSingles } from '../../api/paper'
import Single from '@/components/Single/index.vue'
import Multiple from '@/components/Multiple/index.vue'
import Judge from '@/components/Judge/index.vue'
import Completion from '@/components/Completion/index.vue'
import AFQ from '@/components/AFQ/index.vue'
import { createWrongs } from '../../api/wrongs'
import { deepClone } from '../../utils'

export default {
  name: 'Test',
  components: {
    Single,
    Multiple,
    Judge,
    Completion,
    AFQ
  },
  data () {
    return {
      loading: false,
      limit: 10,
      page: 1,
      total: 0,
      list: [],
      type: '',
      maps: ['single', 'multiple', 'judge', 'completion', 'afq']
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleAddWrong (item) {
      const wrong = [{
        type: this.maps[Number(this.type)],
        subject: item.subjectId.name,
        knowledgePoint: item.knowledgePoint,
        question: item.question,
        original: item.original
      }]
      this.createWrongs(wrong)
    },
    async createWrongs (item) {
      await createWrongs(item)
    },
    async getData () {
      this.loading = true
      const params = {
        limit: this.limit,
        page: this.page,
        knowledgePoint: this.$route.query.knowledgePoint
      }
      const id = this.$route.query.id
      this.type = id
      const funcs = {
        0: getSingles,
        1: getMultiples,
        2: getJudges,
        3: getCompletions,
        4: getAFQs
      }
      const res = await funcs[id](params)
      this.list = res.data.list.map(item => {
        item.original = deepClone(item)
        item.ican = true
        return item
      })
      this.total = res.data.total
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  .test {
    width: 1024px;
    margin: 0 auto;
    padding-top: 32px;
  }
</style>
