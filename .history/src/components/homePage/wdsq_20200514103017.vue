<template>
  <div>
    <cube-input class="timeIpt" v-model="value" ></cube-input>
    <table>
        <tr>
          <th>名称</th>
          <th>审核详情</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>111</td>
          <td>111</td>
          <td>111</td>
        </tr>
    </table>
    <cube-button @click="showDatePicker">Date Picker</cube-button>
  </div>
</template>

<script>
import { queryBusMasterDetail, queryMyBusApp } from '@/request/api'

export default {
  name: 'Home',
  created() {
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
      createtime: '2020-2'
    }).then( res => {
      console.log(res)
    })
  },
  methods: {
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: 'Date Picker',
          min: new Date(2008, 7),
          max: new Date(2020, 9),
          value: new Date(),
          columnCount: 2,
          onSelect: this.selectHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle(selectedVal, selectedText) {
      console.log(selectedText.join('-'))
    }
  }
}
</script>

<style lang="stylus" scoped>
.timeIpt
  width 30%
table
  width: 100%
  border: 1px solid #000
  th,td
    border: 1px solid #ccc
</style>
