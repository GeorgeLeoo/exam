<template>
  <section class="exam">
    <p class="tip">在这里您可以进行正式考试，输入对应场次的考试密码即可进行考试。</p>
    <el-input v-model="password" placeholder="请输入考试密码" class="gap" @keyup.enter.native="handleVerify"/>
    <el-button type="primary" round class="gap check" @click="handleVerify">验证密码</el-button>
    <confirm-dialog :data="confirmData" :visible="dialogVisible" @exam="handleToExaming" @close="handleClose"/>
  </section>
</template>

<script>
import { Input, Button, MessageBox } from 'element-ui'
import { verifyPaperPassword } from '../../api/paper'
import ConfirmDialog from './../Paper/ConfirmDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'Exam',
  components: {
    ElInput: Input,
    ElButton: Button,
    ConfirmDialog
  },
  data () {
    return {
      dialogVisible: false,
      password: '',
      confirmData: {}
    }
  },
  computed: {
    ...mapGetters(['getUsername', 'getPhone'])
  },
  methods: {
    handleToExaming () {
      localStorage.setItem('PAPER_ID', this.paperId)
      localStorage.setItem('PAPER_TYPE', 'RANDOM')
      this.$router.push({ name: 'Examing' })
      this.dialogVisible = false
    },
    handleClose () {
      this.dialogVisible = false
    },
    async handleVerify () {
      const { data } = await verifyPaperPassword({ password: this.password })
      this.paperId = data._id
      this.confirmData.username = this.getUsername
      this.confirmData.phone = this.getPhone
      this.confirmData.paperName = data.paperName
      this.confirmData.subject = data.subject.name
      this.confirmData.startTime = data.startTime
      this.confirmData.endTime = data.endTime
      MessageBox.confirm(
        '您确定进行考试？',
        '密码验证成功',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.dialogVisible = true
      }).catch(() => {})
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
