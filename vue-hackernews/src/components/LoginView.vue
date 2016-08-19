<template>
  <div class="login-content">
    <div class="username-content">
      <span>用户名:</span>
      <input type="text" class="username" value="{{name}}" />
    </div>
    <div class="passwor-content">
      <span>年龄:</span>
      <input type="text" class="password" value="{{age}}"/>
    </div>
    <div class="button">
      <button>提交</button>
    </div>
  </div>
</template>

<script>
export default{
  name : "LoginView",
  data () {
    return{    
      name : "james",
      age : this.update()
    }
  },

  method : {
    update() {
      return "89"
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"
  .login-content
    background-color: #ccc
    min-height: 500px
    .username-content
      margin-top: 20px
      margin-bottom: 20px
      input
        height: 20px
      span
        width: 50px
        display: inline-block
        text-align: justify
    .passwor-content
      input
        height: 20px
      span
        display: inline-block
        -webkit-text-align:justify
        width: 50px
    .button
      margin-top: 20px
      button
        width: 50px
        height: 30px
        line-height: 30px
        font-size: 16px
</style>