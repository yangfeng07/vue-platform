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
        <tr v-for="item in items" :key="item.busRemindId">
          <td>{{ item.busName }}</td>
          <td>{{ item.busStatus==0?'未审核' : (item.busStatus==1?'审核通过' : (item.busStatus==2?'审核未通过' : '重新提交')) }}</td>
          <td>{{ item.createtime }}</td>
          <td>
            <button @click="reload(item.busMasterId, item.busName)" v-show="item.busStatus==2?true : false">重新上传</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="btnWrap" v-show="sfData">
      <cube-button @click="btnQuery('prev')" :inline="true">上一页</cube-button>
      <cube-select @change="queryTab" v-model="pageSec" :options="options"></cube-select>
      <cube-button @click="btnQuery('next')" :inline="true">下一页</cube-button>
    </div>
    <p v-show="!sfData">暂无数据.....</p>
  </div>
</template>

<script>
import { queryBusMasterDetail, queryMyBusApp } from '@/request/api'
import { Dialog, Toast } from 'cube-ui'
import { mapActions } from 'vuex'
const toast = Toast.$create({
                txt: '加载中...',
                mask: true
              })
export default {
  name: 'Home',
  data() {
    return {
      value: 111,
      items: [],
      options: [],
      pageSec: 1,
      sfData: true,
      total: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
        vm.value = new Date().getFullYear() + '-' + (new Date().getMonth()+1)
        vm.queryFirst()
    })
  },
  created() {
    // this.value = new Date().getFullYear() + '-' + (new Date().getMonth()+1)
    // this.queryTab()
  },
  methods: {
    ...mapActions(['GetSubList', 'GetBzText', 'GetMasterId']),
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
      this.queryTab()
    },
    reload(masterId, name) {
      localStorage.setItem("sfWdsq", "true")
      this.GetMasterId(masterId)
      this.GetBzText(name)
      this.$store.dispatch('GetMasterId',masterId)
      queryBusMasterDetail({
        masterId: masterId
      }).then( res => {
        console.log(res)
        console.log(this.$store.getters.subTypeList)
        var arr = []
        res.data.forEach(function(item){
          if(item.busDetailStatus == '2') {
            arr.push(
              {
                subTypeDescription: item.description,
                subTypeId: item.detailTypeId,
                subTypeName: item.busDetailName,
              }
            )
          }
        })
        console.log(arr)
        this.GetSubList(arr)
        this.$router.push({path:'/step/0'})
      })
    },
    queryFirst() {
      toast.show()
      queryMyBusApp({ 
        userId: this.$store.getters.userId,
        page: this.pageSec,
        pageSize: 5,
        status: '',
        createtime: this.value
      }).then( res => {
        toast.hide()
        if(res.code == '000000') {
          this.items = res.data.rows
          this.total = res.data.total
          if(this.total == 0) {
            this.sfData = false
          } else {
            for(let i = 1; i< this.total+1; i++) {
              this.options.push(i)
            }
          }
        } else {
          Dialog.$create({
              type: 'alert',
              content: res.message,
              icon: 'cubeic-alert'
          }).show()
        }
      })
    },
    queryTab() {
      toast.show()
      queryMyBusApp({ 
        userId: this.$store.getters.userId,
        page: this.pageSec,
        pageSize: 5,
        status: '',
        createtime: this.value
      }).then( res => {
        toast.hide()
        if(res.code == '000000') {
          this.items = res.data.rows
        } else {
          Dialog.$create({
              type: 'alert',
              content: res.message,
              icon: 'cubeic-alert'
          }).show()
        }
      })
    },
    btnQuery(text) {
      if(text == 'prev' && this.pageSec > 0) {
        if(this.pageSec == 1) {
          Dialog.$create({
              type: 'alert',
              content: '已经是第一页了',
              icon: 'cubeic-alert'
          }).show()
          return false
        }
        this.pageSec--
      } else if(text == 'next' && this.pageSec < this.total+1) {
        if(this.pageSec == this.total) {
          Dialog.$create({
              type: 'alert',
              content: '已经是最后一页了',
              icon: 'cubeic-alert'
          }).show()
          return false
        }
        this.pageSec++
      }
      this.queryTab()
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
    td
      padding 4px
    th,td
      border none
      vertical-align middle
    th
      font-size 20px
      line-height 40px
      color #fff
    button
      background red
      height 30px
      border 0
      color #fff
      border-radius 2px
.btnWrap
  margin 10px 0
  height 50px
  .cube-btn-inline
    height 30px
    margin 10px 5px
    color #fff
  .cube-select
    height 40px
    margin-top 5px
    display inline-block
    vertical-align top
    width 20%
</style>
