<template>
  <div id="home-cont">
    <div style="text-align: center;position: relative;color: #fff;">
        <img class="home-bg" src="../assets/homeBg.png" alt="">
        <div class="home-text">
            <i class="cubeic-person"></i>
            您好，{{ userId }}！
            <span @click="Return" class="return"><i class="cubeic-back"></i>上一步</span>&nbsp; &nbsp; 
            <span @click="logout" class="logout">退出<i class="cubeic-share"></i></span>
        </div>
    </div>
    <div class="home-body">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'cube-ui'
export default {
  name: 'Home',
  data() {
    return {
        userId: '111'
    }
  },
  created() {
    this.userId = localStorage.getItem("userId")
  },
  methods: {
      logout() {
        console.log(localStorage.getItem("cnjr"))
        Dialog.$create({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: '是否确认退出登录？',
          onConfirm: () => {
            this.$router.push({path:'/'})
          }
        }).show()
          // this.$router.push({path:'/'})
          // this.$router.go(0)
      },
      Return() {
        const routeName = this.$route.path
        if(routeName == '/dashboard') {
          Dialog.$create({
            type: 'alert',
            title: '已经是最上一层！',
            icon: 'cubeic-alert'
          }).show()
        }else if(routeName == '/cgs' || routeName == '/sb') {
          this.$router.push({path:'/dashboard'})
        }else{
          console.log(localStorage.getItem("cnjr"))
          if(localStorage.getItem("cnjr") == 'cgs') {
            this.$router.push({path:'/cgs'})
            // this.$router.go(0)
          } else {
            this.$router.push({path:'/sb'})
          }
        }
      }
  }
}
</script>

<style lang="stylus" scoped>
#home-cont{
    max-width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
}
.home-bg{
    max-width: 100%;
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
.logout{
    color: red;
}
.return{
  color: #FFFC00;
}
</style>
