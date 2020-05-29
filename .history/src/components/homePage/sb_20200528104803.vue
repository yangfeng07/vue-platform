<template>
  <ul>
    <!-- <li @click="toStep">
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
    </li> -->
    <li v-for="item in menuData" :key="item.typeId" @click="toStep(item.typeId, item.typeName, item.iconName, item.subTypeList)">
      <img :src="styleData.filter(i => i.iconName == item.iconName)[0].imgSrc" alt="">
      <span :style="styleData.filter(i => i.iconName == item.iconName)[0].spanStyle">{{ item.typeName }}</span>
    </li>
  </ul>
</template>

<script>
import { createBus } from '@/request/api'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      menuData: [],
      styleData: [
        {
          iconName: "page-nav-li-icon201",
          imgSrc: require('../../assets/njxh.png'),
          spanStyle: ''
        },
        {
          iconName: "page-nav-li-icon202",
          imgSrc: require('../../assets/fwzyz.png'),
          spanStyle: 'color: #3976B0;margin-top: -15px;'
        },
        {
          iconName: "page-nav-li-icon203",
          imgSrc: require('../../assets/wdsq.png'),
          spanStyle: 'color: #9A5C04;margin-top: -15px;'
        }
      ]
    }
  },
  created() {
    localStorage.setItem("sfWdsq", "false")
    this.$store.dispatch("GetCnjr", "sb")
    this.menuData = this.$store.getters.menuData
  },
  methods: {
    ...mapActions(['GetSubList', 'GetBzText', 'GetMasterId']),
    toStep(id, name, iconName, subTypeList) {
      if(iconName == 'page-nav-li-icon203') {
        this.toWdsq()
        return false
      }
      createBus({
        userId: this.$store.getters.userId,
        typeId: id,
        typeName: name
      }).then( res => {
        if(res.code == '000000') {
          console.log(res.data)
          this.GetSubList(subTypeList)
          this.GetBzText(res.data.name)
          this.GetMasterId(res.data.id)
          this.$router.push({path:'/step/0'})
        } else {
          this.$createDialog({
            type: 'alert',
            content: res.msg,
            icon: 'cubeic-alert'
          }).show()
        }
      })
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
  width: 100px;
  font-size: 24px;
  line-height: 30px;
  color: #00A6B3;
  position: absolute;
  left: 30px;
  top: 50%;
  margin-top: -30px;
}
</style>
