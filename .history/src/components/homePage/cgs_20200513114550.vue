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
    <li v-for="item in menuData" :key="item.typeId" @click="toStep(item.typeId, item.typeName, 0, item.subTypeList)" :class="styleData.filter(i => i.id == item.typeId)[0].className">
      <img :src="styleData.filter(i => i.id == item.typeId)[0].imgSrc" alt="">
      <span :style="styleData.filter(i => i.id == item.typeId)[0].spanStyle">{{ item.typeName }}</span>
    </li>
  </ul>
</template>

<script>
import { createBus } from '@/request/api'
export default {
  name: 'Home',
  data() {
    return {
      menuData: '',
      styleData: [
        {
          id: '01',
          className: '',
          imgSrc: require('../../assets/tcts.png'),
          spanStyle: ''
        },
        {
          id: '02',
          className: 'left',
          imgSrc: require('../../assets/szc.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-27px;left: 10px;color: #00A6B3;width: 85px;'
        },
        {
          id: '03',
          className: 'right',
          imgSrc: require('../../assets/dsg.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-27px;left: 20px;color: #525CB2;width: 65px;'
        },
        {
          id: '04',
          className: 'left',
          imgSrc: require('../../assets/lxry.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-27px;left: 20px;color: #AB8304;width: 70px;'
        },
        {
          id: '05',
          className: 'right',
          imgSrc: require('../../assets/fwzy.png'),
          spanStyle: 'font-size:14px;line-height:18px;margin-top:-9px;left: 20px;color: #3976B0;width: 65px;'
        },
        {
          id: '06',
          className: '',
          imgSrc: require('../../assets/wdsq.png'),
          spanStyle: 'color: #9A5C04;margin-top: -15px;'
        },
      ]
    }
  },
  created() {
    localStorage.setItem("cnjr", "cgs")
    this.menuData = this.$store.getters.menuData
  },
  // beforeRouteEnter(to, from, next) {
  //   localStorage.setItem("cnjr", "cgs")
  //   next(vm=>{
  //     getMenu({ pid: 0 }).then( res => {
  //       console.log(res.data)
  //       if(res.code == '000000') {
  //         vm.menuData = res.data
  //       }
  //     })
  //   })
  // },
  methods: {
      toStep(id, name, subId, subTypeList) {
        if(id == '06') {
          this.toWdsq()
          return false
        }
        createBus({
          userId: localStorage.getItem("userId"),
          typeId: id,
          typeName: name
        }).then( res => {
          if(res.code == '000000') {
            console.log(res.data)
            localStorage.setItem("subTypeList", JSON.stringify(subTypeList))
            localStorage.setItem("bzText", res.data.name)
            localStorage.setItem("masterId",res.data.id)
            this.$router.push({path:'/step/'+subId})
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
  width: 100px;
}
</style>
