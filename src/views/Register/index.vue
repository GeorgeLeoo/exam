<!--
  @Description:
  @Author: George
  @Date: 2020/4/19 5:27 PM
-->
<template>
  <div class="login">
    <header class="logo">
      <img class="logo-img" src="./../../assets/logo.png" alt="">
      <span class="logo-text">考试通</span>
    </header>
    <section class="login-wrapper">
      <article class="login-content">
        <div class="login-left">
          <img class="left-img" src="./../../assets/login-pic.jpeg" alt="">
        </div>
        <div class="login-right">
          <h3 class="login-text">注册</h3>
          <div>
            <div class="input-item">
              <h5 class="label">账号</h5>
              <input class="input" type="text" v-model="username">
              <p class="hint">请输入正确的账号</p>
            </div>
            <div class="input-item">
              <h5 class="label">设置密码</h5>
              <input class="input" type="password" v-model="password">
              <p class="hint">密码由字母和数字组成，且不少于 6 位</p>
            </div>
            <div class="input-item">
              <h5 class="label">邮箱</h5>
              <input class="input" type="text" v-model="email">
              <p class="hint">请输入正确的邮箱</p>
            </div>
            <div class="login-btn-wrapper">
              <el-button type="primary">注册</el-button>
            </div>
            <div class="other">
              <span class="forget">已有账号</span>
              <el-button type="text">去登录</el-button>
            </div>
          </div>
        </div>
        <article class="login-footer">
          <img src="./../../assets/login-line-right.png" alt="">
          <span>考试通·完美的在线考试系统</span>
          <img src="./../../assets/login-line-left.png" alt="">
        </article>
      </article>
    </section>
  </div>
</template>
<script>
import { Button } from 'element-ui'
export default {
  name: 'Login',
  components: {
    'el-button': Button
  },
  data () {
    return {
      username: '',
      password: '',
      rePassword: '',
      email: ''
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .login {
    height: 100vh;
    background: url("./../../assets/login-bg.png");
    .logo {
      padding: 22px 32px;
      display: flex;
      .logo-img{
        width: 40px;
        height: 40px;
      }
      .logo-text {
        display: inline-block;
        font-size:32px;
        color:rgba(64,158,255,1);
        margin-left: 10px;
      }
    }
    .login-content {
      width: 1000px;
      height: 560px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background:rgba(255,255,255,1);
      box-shadow:0 2px 12px 0 rgba(0,0,0,0.1);
      border-radius:8px;
      border:1px solid rgba(238,238,238,1);
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      .left-img {
        width:440px;
        height:560px;
        box-shadow:4px 0 12px rgba(0,0,0,0.4);
      }
      .login-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 560px;
        height: 560px;
        .login-text {
          height:50px;
          font-size:36px;
          font-weight:500;
          color:rgba(64,158,255,1);
          line-height:50px;
        }
        .label {
          height:14px;
          font-size:14px;
          font-weight:400;
          color: rgb(165, 168, 176);
          line-height:14px;
        }
        .input-item {
          margin-bottom: 14px;
        }
        .input {
          width:330px;
          height:32px;
          border: none;
          border-bottom: 1px solid #979797;
          font-size: 16px;
        }
        .hint {
          height:14px;
          font-size:14px;
          color:rgba(192,196,204,1);
          line-height:14px;
          margin-top: 5px;
        }
        .login-btn-wrapper {
          margin-top: 40px;
          .el-button{
            width: 100%;
          }
        }
        .other {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin-top: 22px;
          .forget {
            color: #a3a3a3;
          }
        }
      }
    }
    .login-footer {
      position: absolute;
      bottom: -100px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      span {
        padding: 10px;
        font-size:14px;
        font-weight:400;
        color:rgba(64,158,255,1);
      }
    }
  }
</style>
