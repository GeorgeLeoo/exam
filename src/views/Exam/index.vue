<template>
  <section class="exam">
    <p class="tip">在这里您可以进行正式考试，输入对应场次的考试密码即可进行考试。</p>
    <el-input v-model="password" placeholder="请输入考试密码" class="gap"/>
    <el-button type="primary" round class="gap check">验证密码</el-button>
  </section>
</template>

<script>
import { Input, Button } from 'element-ui'

export default {
  name: 'Exam',
  components: {
    ElInput: Input,
    ElButton: Button
  },
  data () {
    return {
      password: ''
    }
  }
}
</script>
<style lang="scss">
  .exam {
    width: 400px;
    margin: 100px auto;

    .tip {
      text-align: center;
      line-height: 32px;
    }
    .gap {
      margin-top: 16px;
    }

    .check {
      width: 100%;
      margin-top: 32px;
    }
  }

</style>
