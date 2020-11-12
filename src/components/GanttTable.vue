<template>
  <div class="user_skills">
    <el-table
      class="orderProductionTable"
      style="width: 750px;background-color: transparent"
      :data="data.filter(item => !search || item.resource.toString().toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="resource"
        label="资源"
        width="150"
        fixed
      />
      <el-table-column
        prop="time1"
        label="7点~8点"
        width="150"
      />
      <el-table-column
        prop="time2"
        label="8点~9点"
        width="150"
      />
      <el-table-column
        prop="time3"
        label="9点~10点"
        width="150"
      />
      <el-table-column
        prop="time4"
        label="10点~11点"
        width="150"
      />
      <el-table-column
        prop="time5"
        label="11点~12点"
        width="150"
      />
      <el-table-column
        prop="time6"
        label="12点~13点"
        width="150"
      />
      <el-table-column
        prop="time7"
        label="13点~14点"
        width="150"
      />
      <el-table-column
        prop="time8"
        label="14点~15点"
        width="150"
      />
      <el-table-column
        prop="time9"
        label="15点~16点"
        width="150"
      />
      <el-table-column
        prop="time10"
        label="16点~17点"
        width="150"
      />
      <el-table-column
        prop="time11"
        label="17点~18点"
        width="150"
      />
      <el-table-column
        prop="time12"
        label="18点~19点"
        width="150"
      />
      <el-table-column
        prop="time13"
        label="19点~20点"
        width="150"
      />
      <el-table-column
        prop="time14"
        label="20点~21点"
        width="150"
      />
      <el-table-column
        prop="time15"
        label="21点~22点"
        width="150"
      />
      <el-table-column
        prop="time16"
        label="22点~23点"
        width="150"
      />
      <el-table-column
        prop="time17"
        label="23点~24点"
        width="150"
      />
      <el-table-column
        prop="time18"
        label="24点~1点"
        width="150"
      />
      <el-table-column
        prop="time19"
        label="1点~2点"
        width="150"
      />
      <el-table-column
        prop="time20"
        label="2点~3点"
        width="150"
      />
      <el-table-column
        prop="time21"
        label="3点~4点"
        width="150"
      />
      <el-table-column
        prop="time22"
        label="4点~5点"
        width="150"
      />
      <el-table-column
        prop="time23"
        label="5点~6点"
        width="150"
      />
      <el-table-column
        prop="time24"
        label="6点~7点"
        width="150"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GantTable',
  props:{
    search:{
      type:String,
    },
    orderProductionData:{
      default:()=>[
        {
          resource:'资源01',
          time1:'',
          time2:'订单1',
          time3:'订单1',
          time4:'',
          time5:'订单1',
          time6:'',
          time7:'订单1',
          time8:'订单1',
          time9:'',
          time10:'',
          time11:'订单1',
          time12:'订单1',
          time13:'',
          time14:'',
          time15:'',
          time16:'订单1',
          time17:'订单1',
          time18:'订单1',
          time19:'',
          time20:'订单1',
          time21:'订单1',
          time22:'',
          time23:'',
          time24:'订单1',

        },
        {
          resource:'资源02',
          time1:'',
          time2:'',
          time3:'',
          time4:'',
          time5:'订单1',
          time6:'',
          time7:'订单1',
          time8:'',
          time9:'',
          time10:'',
          time11:'订单1',
          time12:'订单1',
          time13:'',
          time14:'',
          time15:'',
          time16:'订单1',
          time17:'订单1',
          time18:'订单1',
          time19:'',
          time20:'订单1',
          time21:'订单1',
          time22:'',
          time23:'',
          time24:'订单1',
        },
      ]
    }
  },
  data(){
    return {
      data: []
    }
  },
  watch:{
    orderProductionData:{
      handler() {
        this.data=this.orderProductionData
      }
    }
  },

}
</script>

<style scoped>
.orderProductionTable{

}
.user_skills{
  height: 100%;
}
/*.user_skills /deep/ .el-table , .el-table__expanded-cell {*/
/*  background-color: transparent;*/
/*}*/

/*.user_skills /deep/ .el-table tr {*/
/*  background-color: transparent!important;*/
/*}*/
/*.user_skills /deep/ .el-table th {*/
/*  background-color: transparent!important;*/
/*}*/
/*.user_skills /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{*/
/*  background-color: transparent;*/
/*}*/
</style>
