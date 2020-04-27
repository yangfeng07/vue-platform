<template>
  <ul>
    <li @click="toStep">
      <img src="../../assets/tcts.png" alt="">
      <span>提交退车<br>退税资料</span>
    </li>
    <li @click="toStep" class="left">
      <img src="../../assets/szc.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-27px;left: 10px;color: #00A6B3;">提交设有固定<br>装置的市政车<br>辆免税资料</span>
    </li>
    <li @click="toStep" class="right">
      <img src="../../assets/dsg.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-27px;left: 20px;color: #525CB2;">提交大使<br>馆车辆免<br>税资料</span>
    </li>
    <li @click="toStep" class="left">
      <img src="../../assets/lxry.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-27px;left: 20px;color: #AB8304;">提交归国留学<br>人员车辆免税<br>资料</span>
    </li>
    <li @click="toStep" class="right">
      <img src="../../assets/fwzy.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-9px;left: 20px;color: #3976B0;">服务指引</span>
    </li>
    <li @click="toWdsq">
      <img src="../../assets/wdsq.png" alt="">
      <span style="color: #9A5C04;margin-top: -15px;">我的申请</span>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'Home',
  methods: {
      toStep() {
          this.$router.push({path:'/step/1'})
      },
      toWdsq() {
          this.$router.push({path:'/wdsq'})
      }
  }
}
</script>

<style lang="stylus" scoped>
ul{
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    margin-top: 20px;
}
li{
  position: relative
  float: left
}
.left,.right{
    width: 49%;
}
.right{
    float: right;
}
img{
  width: 100%;
}
span{
  font-size: 24px;
  line-height: 30px;
  color: #3976B0;
  position: absolute;
  left: 30px;
  top: 50%;
  margin-top: -30px;
}
</style>
