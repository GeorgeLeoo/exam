<!--
  @Description:
  @Author: George
  @Date: 2020/4/25 2:58 PM
-->
<template>
  <el-dialog
    title="考生身份信息确认"
    :visible.sync="visible"
    :before-close="handleClose"
    width="30%">
    <el-form label-width="100px">
      <el-form-item label="账号：">
        <span>{{ data.username }}</span>
      </el-form-item>
      <el-form-item label="手机号：">
        <span>{{ data.phone }}</span>
      </el-form-item>
      <el-form-item label="考试科目：">
        <span>{{ data.subject }}</span>
      </el-form-item>
      <el-form-item label="考试名称：">
        <span>{{ data.paperName }}</span>
      </el-form-item>
      <el-form-item label="考试日期：">
        <span>{{ data.startTime }} - {{ data.endTime }}</span>
      </el-form-item>
      <el-form-item label="考试时长：">
        <span>{{ data | getDurationTime }}分钟</span>
      </el-form-item>
    </el-form>
    <div>
      <p>如果您已确认以上信息无误，请点击"开始考试"按钮进入考试；请注意考试纪律，严禁作弊。</p>
    </div>
    <div class="start-exam-btn">
      <el-button type="primary" @click="handleToExaming">开始考试</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { Dialog, Form, FormItem, Button } from 'element-ui'
export default {
  name: 'ConfirmDialog',
  components: {
    ElDialog: Dialog,
    ElForm: Form,
    ElFormItem: FormItem,
    ElButton: Button
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {
    handleToExaming () {
      this.$emit('exam')
    },
    /**
     * 关闭事件
     */
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
  .start-exam-btn {
    text-align: center;
    margin-top: 20px;
  }
</style>
