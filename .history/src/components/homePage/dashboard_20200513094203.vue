<template>
  <ul>
    <li @click="toStepcgs">
      <img src="../../assets/cgs.png" alt="">
      <span>车购税</span>
    </li>
    <li @click="toStepsb">
      <img src="../../assets/sb.png" alt="">
      <span style="color: #FEA100;">社保</span>
    </li>
  </ul>
</template>

<script>
import { getMenu } from '@/request/api'
export default {
  name: 'Home',
  methods: {
    toStepcgs() {
      this.$router.push({path:'/cgs'})
    },
    toStepsb() {
      this.$router.push({path:'/sb'})
    }
  }
}
</script>

<style lang="stylus" scoped>
ul{
  width: 96%;
  margin: 0 auto;
}
li{
  position: relative
}
img{
  width: 100%;
}
span{
  font-size: 24px;
  line-height: 30px;
  color: #0088C1;
  position: absolute;
  left: 20px;
  top: 50%;
  margin-top: -15px;
}
</style>
