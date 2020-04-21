<template>
  <div>
    <div style="position: relative;">
      <img class="loginBg" src="../assets/loginBg.png" alt="">
      <img class="swName" src="../assets/swName.png" alt="">
    </div>
    <div class="login-body">
      <div class="phone-cont">
        <img src="../assets/icon-phone.png" alt="">
        <cube-input 
          :model="value"
          :placeholder="placeholder"
          :type="type"
          :maxlength="maxlength" ></cube-input>
      </div>
      <div class="phone-cont">
        <img src="../assets/icon-yzm.png" alt="">
        <cube-input 
          :model="yzm"
          :placeholder="yzmplaceholder"
          :type="yzmtype"
          :maxlength="yzmmaxlength" ></cube-input>
        <cube-button class="fsyzm" :inline="true">发送验证码</cube-button>
      </div>
      <cube-button class="loginBtn" :inline="true">登录</cube-button>
    </div>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        placeholder: '请输入手机号',
        maxlength: 11,
        type: 'number',
        yzm: '',
        yzmplaceholder: '请输入验证码',
        yzmmaxlength: 6,
        yzmtype: 'number'
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
.cube-input:after {
  border: 0;
}
.cube-input {
  float: left;
  margin-left: 20px;
  width: 60%;
}
.loginBg {
  width: 100%;
}
.swName {
  width: 70%;
  position:absolute;
  top:50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.login-body{
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
}
.phone-cont{
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 2px solid #FAFBFD;
  overflow: hidden;
  position: relative;
}
.phone-cont img{
  float: left;
  width: 15px;
  position:absolute;
  top:50%;
  left: 0;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(0, -50%);
}
.phone-cont .cube-btn{
  position:absolute;
  top:50%;
  right: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  background: #fff;
  color: #2B8AFF;
  border-radius: 5px;
  border: 1px solid #3D93F3;
}
.loginBtn{
  width: 80%;
  height: 40px;
  margin: 0 auto;
  background: #2B8AFF;
  color: #fff;
  border-radius: 25px;
  letter-spacing: 3px;
  font-size: 16px;
  margin-top: 20px;
}
.loginBtn:active{
  background: #3D93F3;
}
.fsyzm:active{
  color: #fff;
  background: #2b8aff;
}
</style>