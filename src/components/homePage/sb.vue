<template>
  <ul>
    <li @click="toStep">
      <img src="../../assets/njxh.png" alt="">
      <span>年金销号<br>资料上传</span>
    </li>
    <li @click="toStep">
      <img src="../../assets/fwzyz.png" alt="">
      <span style="color: #3976B0;margin-top: -15px;">服务指引</span>
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
  created() {
    localStorage.setItem('cnjr', 'sb')
  },
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
  color: #00A6B3;
  position: absolute;
  left: 30px;
  top: 50%;
  margin-top: -30px;
}
</style>
