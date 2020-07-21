<template>
  <div>
    <div style="position: relative">
      <img class="home-bg" src="../assets/homeBg.png" alt="">
      <div class="home-text">系统选择</div>
    </div>
    <ul>
      <li @click="toStep('/login')">
        <img src="../assets/fjcfw.png" alt="">
      </li>
      <li @click="toZnStep()">
        <img src="../assets/bszn.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    toStep(url) {
        this.$router.push({path: url})
    },
    toZnStep() {
        window.location.href = 'http://csp.hxdkfp.com:7200/whscgsywdb'
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
.home-text{
    line-height: 30px;
    font-size: 24px;
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    margin-top: -15px;
    color: #fff
}
</style>
