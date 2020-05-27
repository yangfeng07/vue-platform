<template>
  <div id="home-cont">
    <div class="topWrap" style="position: relative;color: #fff;">
        <img class="home-bg" src="../assets/homeBg.png" alt="">
        <span @click="Return" class="return"><i class="cubeic-back"></i>上一步</span>
        <div class="home-text">
            <i class="cubeic-person"></i>
            您好，{{ userId }}！
        </div>
        <span @click="logout" class="logout">退出<i class="cubeic-share"></i></span>
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
    this.userId = this.$store.getters.userId
  },
  methods: {
      logout() {
        Dialog.$create({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: '是否确认退出登录？',
          onConfirm: () => {
            this.$router.push({path:'/'})
          }
        }).show()
      },
      Return() {
        const routeName = this.$route.path
        if(routeName == '/dashboard') {
          Dialog.$create({
            type: 'alert',
            title: '已经是最上一层！',
            icon: 'cubeic-alert'
          }).show()
        }else if(routeName == '/cgs' || routeName == '/socialsecurity') {
          this.$router.push({path:'/dashboard'})
        }else{
          if(this.$store.getters.cnjr == 'cgs') {
            this.$router.push({path:'/cgs'})
          } else {
            this.$router.push({path:'/socialsecurity'})
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
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    margin-top: -15px;
}
.home-body{
    flex:auto;
}
.topWrap span{
  position: absolute;
  top: 5px;
  font-size: 18px;
}
.logout{
    color: #FFFC00;
    right: 10px;
}
.return{
  color: #FFF;
  left: 5px;
}
</style>
