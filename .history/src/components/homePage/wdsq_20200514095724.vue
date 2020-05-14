<template>
  <div>
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
      createtime: '2020-02'
    }).then( res => {
      console.log(res)
    })
  },
  methods: {
      
  }
}
</script>

<style lang="stylus" scoped>
table
  width: 100%
  border: 1px solid #000
  th,td
    border: 1px solid #ccc
</style>
