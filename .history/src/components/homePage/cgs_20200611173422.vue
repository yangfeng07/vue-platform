<template>
  <ul>
    <!-- <li @click="toStep">
      <img src="../../assets/tcts.png" alt="">
      <span>提交退车退税资料</span>
    </li>
    <li @click="toStep" class="left">
      <img src="../../assets/szc.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-27px;left: 10px;color: #00A6B3;width: 85px;">提交设有固定装置的市政车辆免税资料</span>
    </li>
    <li @click="toStep" class="right">
      <img src="../../assets/dsg.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-27px;left: 20px;color: #525CB2;width: 65px;">提交大使馆车辆免税资料</span>
    </li>
    <li @click="toStep" class="left">
      <img src="../../assets/lxry.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-27px;left: 20px;color: #AB8304;width: 70px;">提交归国留学人员车辆免税资料</span>
    </li>
    <li @click="toStep" class="right">
      <img src="../../assets/fwzy.png" alt="">
      <span style="font-size:14px;line-height:18px;margin-top:-9px;left: 20px;color: #3976B0;width: 65px;">服务指引</span>
    </li>
    <li @click="toWdsq">
      <img src="../../assets/wdsq.png" alt="">
      <span style="color: #9A5C04;margin-top: -15px;">我的申请</span>
    </li> -->
    <li v-for="item in menuData" :key="item.typeId" @click="toStep(item.typeId, item.typeName, item.iconName, item.subTypeList)" :class="styleData.filter(i => i.iconName == item.iconName)[0].className">
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
      menuData: '',
      styleData: [
        {
          iconName: "page-nav-li-icon1",
          className: '',
          imgSrc: require('../../assets/tcts.png'),
          spanStyle: ''
        },
        {
          iconName: 'page-nav-li-icon2',
          className: 'left',
          imgSrc: require('../../assets/szc.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-27px;left: 10px;color: #00A6B3;width: 85px;'
        },
        {
          iconName: 'page-nav-li-icon3',
          className: 'right',
          imgSrc: require('../../assets/dsg.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-27px;left: 10px;color: #525CB2;width: 80px;'
        },
        {
          iconName: 'page-nav-li-icon4',
          className: 'left',
          imgSrc: require('../../assets/lxry.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-27px;left: 20px;color: #AB8304;width: 85px;'
        },
        {
          iconName: 'page-nav-li-icon5',
          className: 'right',
          imgSrc: require('../../assets/fwzy.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-9px;left: 20px;color: #3976B0;width: 65px;'
        },
        {
          iconName: "page-nav-li-icon6",
          className: '',
          imgSrc: require('../../assets/wdsq.png'),
          spanStyle: 'color: #9A5C04;margin-top: -15px;'
        }
      ]
    }
  },
  created() {
    localStorage.setItem("sfWdsq", "false")
    this.$store.dispatch("GetCnjr", "cgs")
    var arr = []
    
    this.menuData = this.$store.getters.menuData
  },
  methods: {
      ...mapActions(['GetSubList', 'GetBzText', 'GetMasterId']),
      toStep(id, name, iconName, subTypeList) {
        const toast = this.$createToast({
          txt: 'Loading...',
          mask: true,
          time: 0
        })
        if(iconName == 'page-nav-li-icon6') {
          this.toWdsq()
          return false
        }
        if(subTypeList.length == 0) {
          this.$createDialog({
            type: 'alert',
            content: '模块暂未开放',
            icon: 'cubeic-alert'
          }).show()
          return false
        }
        toast.show()
        createBus({
          userId: this.$store.getters.userId,
          typeId: id,
          typeName: name
        }).then( res => {
          if(res.code == '000000') {
            toast.hide()
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
  font-size: 24px;
  line-height: 30px;
  color: #3976B0;
  position: absolute;
  left: 30px;
  top: 50%;
  margin-top: -30px;
  width: 100px;
}
</style>
