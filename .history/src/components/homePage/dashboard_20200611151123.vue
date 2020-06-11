<template>
  <ul>
    <!-- <li @click="toStep(0, '/cgs')">
      <img src="../../assets/cgs.png" alt="">
      <span>车购税</span>
    </li>
    <li @click="toStep(1, '/sb')">
      <img src="../../assets/sb.png" alt="">
      <span style="color: #FEA100;">社保</span>
    </li> -->
    <li v-for="item in menuBigData" :key="item.typeId" @click="toStep(item.typeId, item.jumpURL)">
      <img :src="styleData.filter(i => i.iconName == item.iconName)[0].imgSrc" alt="">
      <span :style="styleData.filter(i => i.iconName == item.iconName)[0].spanStyle">{{ item.typeName }}</span>
    </li>
  </ul>
</template>

<script>
// import { getMenu } from '@/request/api'
export default {
  name: 'Home',
  data() {
    return {
      menuBigData: [],
      styleData: [
        {
          iconName: 'page-nav-li-icon101',
          imgSrc: require('../../assets/cgs.png'),
        },
        {
          iconName: 'page-nav-li-icon102',
          imgSrc: require('../../assets/sb.png'),
          spanStyle: 'color: #FEA100;'
        }
      ]
    }
  },
  created() {
    this.menuBigData = this.$store.getters.menuBigData
  },
  methods: {
    toStep(pid, url) {
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true,
        time: 0
      })
      toast.show()
      this.$store.dispatch('GetMenu',pid).then(() => {
        toast.hide()
        this.$router.push({path: url})
      })
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
