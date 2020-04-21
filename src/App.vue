<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  }
  a {
    text-decoration: none;
  }

  .wrapper1024 {
    width: 1024px;
    margin: 0 auto;
  }

  .clearfix::after {
    content: '.';
    display: block;
    visibility: hidden;
    clear: both;
    width: 0;
    height: 0;
  }
  .fl{
    float: left;
    display: inline-block;
  }
  .fr{
    float: right;
    display: inline-block;
  }
  input {
    outline: none;
  }
</style>
