<template>
  <div id="home-cont">
    <div style="text-align: center;position: relative;color: #fff;">
        <img class="home-bg" src="../assets/homeBg.png" alt="">
        <div class="home-text">
            <i class="cubeic-person"></i>
            您好，152689746！
            <span @click="Return" class="return">退出<i class="cubeic-arrow"></i></span>
        </div>
    </div>
    <div class="home-body">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
      Return() {
          console.log(this.$store.state.token)
          this.$router.push({path:'/'})
      }
  }
}
</script>

<style lang="stylus" scoped>
#home-cont{
    height: 100%;
    display:flex;
    flex-direction: column;
}
.home-bg{
    width: 100%;
}
.home-text{
    line-height: 30px;
    font-size: 18px;
    position: absolute;
    left: 20px;
    top: 50%;
    margin-top: -15px;
}
.home-body{
    flex:auto;
}
.return{
    color: #FFFC00;
}
.return:active{
    color: red;
}
</style>
