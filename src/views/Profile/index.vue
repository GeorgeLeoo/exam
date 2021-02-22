<!--
  @Description:
  @Author: George
  @Date: 2020/5/10 1:41 PM
-->
<template>
  <div class="profile wrapper1024 clearfix">
    <el-form
      ref="form"
      label-width="70px"
    >
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="/upload-img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="picture"
            :src="picture | pic"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="账号">
        <span></span>
      </el-form-item>
      <el-form-item label="手机号">
        <span></span>
      </el-form-item>
      <el-form-item label="个性签名">
      <!--        <el-input-->
      <!--          type="textarea"-->
      <!--          :rows="2"-->
      <!--          placeholder="请输入内容"-->
      <!--          v-model="textarea">-->
      <!--        </el-input>-->
      </el-form-item>
    </el-form>
    <tabs @tab="handleTab">
      <tab title="tab1" name="1">1</tab>
      <tab title="tab2" name="2">2</tab>
      <tab title="tab3" name="3">3</tab>
    </tabs>
  </div>
</template>
<script>
import { Upload, Form, FormItem } from 'element-ui'
import Tab from './components/Tab'
import Tabs from './components/Tabs'
export default {
  name: 'Profile',
  components: {
    ElUpload: Upload,
    ElForm: Form,
    ElFormItem: FormItem,
    Tab,
    Tabs
  },
  data () {
    return {
      picture: ''
    }
  },
  methods: {
    handleTab (i) {
      console.log(i)
    },
    handleAvatarSuccess (res) {
      this.$set(this.data, 'picture', res.data)
    },
    beforeAvatarUpload (file) {
      return file.size / 1024 / 1024 < 2
    }
  }
}
</script>

<style lang="scss">
  .profile {
    margin-top: 16px;
    position: relative;
    .avatar-uploader .el-upload {
      border: 1px solid red;
      border-radius: 100%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 78px;
      height: 78px;
      line-height: 78px;
      text-align: center;
    }
  }
</style>
