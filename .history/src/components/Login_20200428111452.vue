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
          v-model="phone"
          :placeholder="placeholder"
          :type="type"
          :maxlength="maxlength" ></cube-input>
        <cube-validator 
          ref="validatorPhone" 
          v-model="valid" 
          :model="phone"
          :rules="rulesPhone"
          :messages="messages"></cube-validator>
      </div>
      <div class="phone-cont">
        <img src="../assets/icon-yzm.png" alt="">
        <cube-input 
          :model="yzm"
          :placeholder="yzmplaceholder"
          :type="yzmtype"
          :maxlength="yzmmaxlength" ></cube-input>
        <cube-button :disabled="false" :inline="true" :primary="true" @click="sendYzm" class="fsyzm">发送验证码</cube-button>
      </div>
      <cube-button @click="login" class="loginBtn" :inline="true">登录</cube-button>
    </div>
  </div>
  
</template>

<script>
  import { getYzm } from '@/request/api'
  export default {
    data() {
      return {
        phone: '',
        placeholder: '请输入手机号',
        maxlength: 11,
        type: 'number',
        valid: undefined,
        rulesPhone: {
            required: true,
            type: 'number',
            len: 11,
            pattern: /^1[3456789]\d{9}$/
        },
        messages: {
          pattern: '请填写正确的手机号'
        },
        yzm: '',
        yzmplaceholder: '请输入验证码',
        yzmmaxlength: 6,
        yzmtype: 'number'
      }
    },
    methods: {
      sendYzm() {
        if(this.phone=='') {
          this.$createDialog({
            type: 'alert',
            content: '请填写手机号码',
            icon: 'cubeic-alert'
          }).show()
        }
        if(this.valid) {
          getYzm(this.phone)
        }
      },
      login() {
        this.$router.push({path:'/Home'})
      }
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
  width: 40%;
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
.fsyzm{
  float: right;
  border: 1px solid #3D93F3;
}
.cube-btn_disabled{
  border: 1px solid #ccc;
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
</style>