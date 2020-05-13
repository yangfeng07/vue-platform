<template>
  <div style="position: relative;height: 100%;">
      <p class="bzTitle"><span>{{ bzText }}</span>,请依照下列要求上传对应文件：</p>
      <p class="xTitle">{{ tIndex }}、{{ xText }}</p>
      <cube-upload
        ref="upload"
        v-model="files"
        :action="action"
        @files-added="addedHandler"
        @file-error="errHandler"
        @file-removed="removeHandler">
        <div class="clear-fix">
            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i" @click="showImage"></cube-upload-file>
            <cube-upload-btn :multiple="false">
            </cube-upload-btn>
        </div>
      </cube-upload>
      <div>
        <cube-button class="prev" v-show="prev" @click="prevFun" :inline="true">上一步</cube-button>
        <cube-button class="next" @click="nextFun" :inline="true">下一步</cube-button>
      </div>
      <cube-button v-show="play" @click="btnClick" class="btn">旋转</cube-button>
  </div>
</template>

<script>
let current = 0

import { Dialog } from 'cube-ui'
import { createBusRemind } from '@/request/api'
export default {
  name: 'Home',
  data() {
    return {
      action: {
        target: '/api/client/uploadFile',
        headers: {
          token: sessionStorage.getItem("token")
        },
        data: {
          userId: localStorage.getItem("userId"),
          detailTypeId: '001',
          masterId: localStorage.getItem("masterId")
        },
        checkSuccess: this.checkSuccess
      },
      sfysc: false,
      files: [],
      imgs: [],
      bzText: '提交退车退税资料',
      tIndex: 1,
      xText: "车辆购置税退税申请表",
      play: false,
      subTypeList: [],
      id: '',
      prev: false
    }
  },
  created() {
    this.subTypeList = JSON.parse(localStorage.getItem("subTypeList"))
    console.log(this.subTypeList)
    this.id = this.$route.params.id
    this.bzText = localStorage.getItem("bzText")
    this.tIndex = +this.id + 1
    this.xText = this.subTypeList[+this.id].subTypeName
    if(this.id > 0) {
      this.prev = true
    }
    this.action.data.detailTypeId = this.subTypeList[+this.id].subTypeId
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'cgs' || from.name == 'sb') {
      to.meta.isBack = true
    }
    next();
  },
  activated() {
    if (this.$route.meta.isBack) {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
      this.sfysc = false
    }
  },
  methods: {
    checkSuccess(res) {
      if(res.code == '000000') {
        this.sfysc = true
        return true
      }
      return false
    },
    prevFun() {
      console.log(this.$routes)
      this.$route.meta.isBack = false
      this.$router.push({name:'step',params: {id: this.id-1}})
    },
    nextFun() {
      if(!this.sfysc) {
        Dialog.$create({
          type: 'alert',
          title: '请先上传文件',
          icon: 'cubeic-alert'
        }).show()
        return false
      }
      if(this.tIndex == this.subTypeList.length) {
        createBusRemind({
          userId: localStorage.getItem("userId"),
          maseterId: localStorage.getItem("maseterId")
        }).then( res => {
          if(res.code == '000000') {
            Dialog.$create({
              type: 'alert',
              title: '上传已完成，请等待审核',
              icon: 'cubeic-alert'
            }).show()
          }
        })
        return false
      }
      this.$router.push({name:'step',params: {id: +this.id+1}})
    },
    addedHandler() {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    errHandler() {
      this.sfysc = false
    },
    removeHandler() {
      this.sfysc = false
    },
    showImage() {
      this.play = true
      this.imgs[0] = this.files[0].url
      this.$createImagePreview({
        imgs: this.imgs,
        onHide: () => {
          this.play = false
        }
      }).show()
    },
    btnClick() {
        current = (current+90)%360
        document.getElementsByClassName("cube-scroll-list-wrapper")[0].style.transform = 'rotate('+current+'deg)'
    }
  }
}
</script>

<style lang="stylus" scoped>
.next
  background: #2B8AFF
  color: #fff
.next:active
  background: #3D93F3
.prev,.next
  width: 40%
  height: 40px
  margin: 0 5px
  border-radius: 25px
  letter-spacing: 3px
  font-size: 16px
  margin-top: 40px
.btn
  position: absolute
  bottom: 5%
  left: 50%
  z-index: 1000
  width: 30%
  border-radius: 50%
  transform: translateX(-50%)
.bzTitle,.xTitle
   font-size: 18px
   text-align: left
   padding: 0 10px
   line-height: 30px
.xTitle
   color: #FE8900
.cube-upload
  width: 40%
  margin: 30px auto 0
  .cube-upload-file, .cube-upload-btn
    margin: 0
    height: 200px
  .cube-upload-file
    margin: 0
    + .cube-upload-btn
      display: none
  .cube-upload-file-def
    width: 50%
    height: 100%
    .cubeic-wrong
      display: none
  .cube-upload-btn
    display: flex
    align-items: center
    justify-content: center
    > div
      text-align: center
    i
      display: inline-flex
      align-items: center
      justify-content: center
      width: 50px
      height: 50px
      margin-bottom: 20px
      font-size: 32px
      line-height: 1
      font-style: normal
      color: #fff
      background-color: #333
      border-radius: 50%
</style>

<style lang="stylus">
.cube-upload-btn-def
  width: 100%
  height: 100%
  background: #F1F1F1
.cube-upload-file-def
  width: 100%
  height: 200px
.cube-image-preview-counter{
    display: none
}
</style>