<!--
  @Description:
  @Author: George
  @Date: 2020/3/15 8:23 PM
-->
<template>
  <div class="question-list">
    <h3>多选题（共{{ data.length }}题<span v-if="isTest">）</span><span v-if="!isTest">，每小题{{ score }}分）</span></h3>
    <dl
      v-for="(item, index) in data"
      :key="index"
      class="question-list-item"
    >
      <dt class="question-list-item-title">
        {{ index + 1 }}. {{ item.original.question }}
      </dt>
      <dd class="question-list-item-option">
        A：{{ item.original.a }}
      </dd>
      <dd class="question-list-item-option">
        B：{{ item.original.b }}
      </dd>
      <dd class="question-list-item-option">
        C：{{ item.original.c }}
      </dd>
      <dd class="question-list-item-option">
        D：{{ item.original.d }}
      </dd>
      <dd>
        <el-button :disabled="!item.ican" type="danger" size="mini" @click="handleShowAnswer(item)">我不会</el-button>
      </dd>
      <template v-if="!isTest">
        <dd class="question-list-item-option question-list-item-answer">
          你的答案：{{ item.answer.join(", ") }}
        </dd>
        <dd class="question-list-item-option question-list-item-correctAnswer">
          正确答案：{{ item.original.correctAnswer.join(", ") }}
        </dd>
      </template>
      <template v-if="isTest && !item.ican">
        <dd class="question-list-item-title">
          正确答案：{{ item.original.correctAnswer.join(', ') }}
        </dd>
        <dd class="question-list-item-title">
          考点：{{ item.original.knowledgePoint }}
        </dd>
        <dd class="question-list-item-title">
          解析：{{ item.original.explanation }}
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
  name: 'Multiple',
  components: {
    ElButton: Button
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isTest: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      ican: true
    }
  },
  methods: {
    handleShowAnswer (item) {
      item.ican = false
      this.$emit('wrong', item)
    }
  }
}
</script>

<style scoped lang="scss">
  .question-list {
    h3 {
      font-size: 20px;
    }
    .question-list-item {
      padding: 10px 0;
      font-size: 16px;
      line-height: 26px;
    }
    .question-list-item-title {
      padding-bottom: 10px;
    }
    .question-list-item-option {
      margin-left: 0;
      color: #606266;
    }
    h3 {
      font-size: 20px;
      color: #333;
    }
    .question-list-item-correctAnswer {
      padding-top: 10px;
      color: #409EFF;
    }
    .question-list-item-answer {
      padding-top: 10px;
      color: red;
    }
  }
</style>
