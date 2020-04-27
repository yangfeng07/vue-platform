<template>
  <div style="position: relative;height: 100%;">
      <p class="bzTitle">退车退税资料,请依照下列要求上传对应文件：</p>
      <p class="xTitle">1、车辆购置税退税申请表</p>
      <cube-upload
        ref="upload"
        v-model="files"
        :action="action"
        @files-added="addedHandler"
        @file-error="errHandler">
        <div class="clear-fix">
            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i" @click="showImage"></cube-upload-file>
            <cube-upload-btn :multiple="false">
            </cube-upload-btn>
        </div>
      </cube-upload>
      <cube-button class="next" :inline="true">下一步</cube-button>
      <cube-button v-show="play" @click="btnClick" class="btn">旋转</cube-button>
  </div>
</template>

<script>
let current = 0
export default {
  name: 'Home',
  data() {
    return {
      action: '//jsonplaceholder.typicode.com/photos/',
      files: [],
      imgs: [],
      play: false
    }
  },
  methods: {
    addedHandler() {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    errHandler(file) {
      const msg = file.response.message
      this.$createToast({
        type: 'warn',
        txt: msg,
        time: 1000
      }).show()
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
  width: 80%
  height: 40px
  margin: 0 auto
  background: #2B8AFF
  color: #fff
  border-radius: 25px
  letter-spacing: 3px
  font-size: 16px
  margin-top: 40px
.next:active
  background: #3D93F3
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
   text-indent: 10px
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