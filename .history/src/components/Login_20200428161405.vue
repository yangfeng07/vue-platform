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
          v-model="yzm"
          :placeholder="yzmplaceholder"
          :type="yzmtype"
          :maxlength="yzmmaxlength" ></cube-input>
        <cube-button :disabled="disabled" :inline="true" :primary="true" @click="sendYzm('myPopup')" class="fsyzm">{{ yzmText }}</cube-button>
      </div>
      <cube-button @click="login" class="loginBtn" :inline="true">登录</cube-button>
      <cube-popup :mask="false" type="my-popup" ref="myPopup">
        {{ popupText }}
      </cube-popup>
    </div>
  </div>
  
</template>

<script>
  import { getYzm, login } from '@/request/api'
  export default {
    data() {
      return {
        disabled: false,
        time: 60,
        timer: undefined,
        yzmText: '发送验证码',
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
        yzmtype: 'number',
        popupText: ''
      }
    },
    methods: {
      getTime() {
        this.yzmText = this.time-1 + 's后重新发送'
        this.disabled = true
        if(this.time === 0) {
          this.yzmText = '发送验证码'
          this.disabled = false
          this.time = 61
          clearInterval(this.timer)
        }
        this.time--
      },
      sendYzm(refId) {
        if(this.phone=='') {
          this.$createDialog({
            type: 'alert',
            content: '请填写手机号码',
            icon: 'cubeic-alert'
          }).show()
        }
        if(this.valid) {
          getYzm(this.phone).then( res => {
            this.popupText = res
            const component = this.$refs[refId]
            component.show()
            // setTimeout(() => {
            //   component.hide()
            // }, 1000)
            if(res == '发送成功') {
              this.yzmText = this.time + 's后重新发送'
              this.disabled = true
              this.timer = setInterval(this.getTime, 1000)
            }
          })
        }
      },
      login() {
        login({
          username: this.phone,
          smsCode: this.yzm
        }).then( res => {
          console.log(res)
          if(res.code == '000000') {
            this.$store.state.token = res.data
            this.$router.push({path:'/Home'})
          } else {
            this.$createDialog({
              type: 'alert',
              content: res.msg,
              icon: 'cubeic-alert'
            }).show()
          }
        })
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

<style>
.cube-toast .cube-popup-center .cube-popup-content{
  padding: 20px;
  color: #fff;
  background-color: rgba(0,0,0,.8);
  font-size: 20px;
}
</style>