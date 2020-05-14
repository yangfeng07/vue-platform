<template>
  <div>
    <div class="timeWrap">
      <span>时间：</span>
      <cube-input @focus="showDatePicker" class="timeIpt"  v-model="value" ></cube-input>
    </div>
    <div class="tableWrap">
      <table style="width: 590px">
        <tr style="background: #4C94FF">
          <th style="width: 190px">业务名称</th>
          <th style="width: 120px">处理进度</th>
          <th style="width: 180px">上传时间</th>
          <th style="width: 100px">操作</th>
        </tr>
        <tr>
          <td>提交设有固定装置的市政车辆免税资料</td>
          <td>111</td>
          <td>111</td>
          <td>111</td>
        </tr>
        <tr>
          <td>提交设有固定装置的市政车辆免税资料</td>
          <td>111</td>
          <td>111</td>
          <td>111</td>
        </tr>
      </table>
    </div>
    <div class="btnWrap">
      <cube-button :inline="true" :primary="true">上一页</cube-button>
      <cube-select v-model="pageSec" :options="options"></cube-select>
      <cube-button :inline="true" :primary="true">下一页</cube-button>
    </div>
    <p>暂无数据.....</p>
  </div>
</template>

<script>
import { queryBusMasterDetail, queryMyBusApp } from '@/request/api'

export default {
  name: 'Home',
  data() {
    return {
      value: 111,
      items: [],
      options: [1,2,3,4,5],
      pageSec: 1
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
.tableWrap
  width 100%
  overflow auto
  table
    font-size 18px
    line-height 24px
    border: 0
    tr:nth-child(odd)
      background #F0F3F7
    tr:nth-child(even)
      background #fff
    th,td
      border none
      vertical-align middle
    th
      font-size 20px
      line-height 40px
      color #fff
.btnWrap
  margin 10px 0
  height 50px
  .cube-btn-inline
    height 30px
    margin 10px 0
  .cube-select
    height 40px
    display inline-block
    width 20%
</style>
