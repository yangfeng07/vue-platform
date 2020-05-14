<template>
  <div>
    <div class="timeWrap">
      <span>时间：</span>
      <cube-input class="timeIpt" :readonly="true" v-model="value" ></cube-input>
    </div>
    <cube-scroll
      ref="scroll"
      :data="items"
      direction="horizontal"
      class="horizontal-scroll-list-wrap">
      <table>
        <tr>
          <th style="width: 180px">业务名称</th>
          <th>处理进度</th>
          <th>上传时间</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>111</td>
          <td>111</td>
          <td>111</td>
          <td>111</td>
        </tr>
      </table>
    </cube-scroll>
    <p>暂无数据</p>
    <cube-button @click="showDatePicker">Date Picker</cube-button>
  </div>
</template>

<script>
import { queryBusMasterDetail, queryMyBusApp } from '@/request/api'

export default {
  name: 'Home',
  data() {
    return {
      value: 111
    }
  },
  created() {
    this.value = new Date().getFullYear() + '-' + (new Date().getMonth()+1)
    queryBusMasterDetail({
      masterId: localStorage.getItem("masterId")
    }).then( res => {
      console.log(res)
    })
    queryMyBusApp({ 
      userId: localStorage.getItem("userId"),
      page: 1,
      pageSize: 5,
      status: '',
      createtime: this.value
    }).then( res => {
      console.log(res)
    })
  },
  methods: {
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '月份选择',
          min: new Date(2008, 7),
          max: new Date(),
          value: new Date(),
          columnCount: 2,
          onSelect: this.selectHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle(selectedVal, selectedText) {
      this.value = selectedText.join('-')
    }
  }
}
</script>

<style lang="stylus" scoped>
.timeWrap
  height 40px
  line-height 40px
  text-indent 10px
  font-size 18px
  span
    float left
  .timeIpt
    width 30%
    height 30px
    margin 5px 0
    float left
table
  font-size 18px
  line-height 24px
  border: 1px solid #000
  th,td
    border: 1px solid #ccc
</style>
