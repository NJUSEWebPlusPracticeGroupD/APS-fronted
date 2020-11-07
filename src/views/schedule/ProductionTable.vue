<template>
  <el-main class="main">
    <div
      style="float:right;margin:-30px 38px 0 0;font-size:20px"
    >
      {{ time }}
    </div>
    <div
      class="allPage"
    >
      <div
        style="display: inline; float: left; padding-left: 4%; "
      >
        <el-row style="margin:10px 0 20px">
          <el-date-picker
            v-model="value"
            class="date-picker"
            type="date"
            :placeholder="time"
            :default-value="time"
          />
          <el-button
            round
            class="button"
            @click="getProductionData"
          >
            确定
          </el-button>
          <div
            class="toexcel"
            style="float:left;margin-left: 50%"
          >
            <el-button
              type="primary"
              plain
              icon="el-icon-download"
              @click="exportExcel"
            >
              导出表单
            </el-button>
          </div>
        </el-row>
        <GanttTable :order-production-data="orderProductionData" />
      </div>
    </div>
  </el-main>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import GanttTable from '@/components/GanttTable'

export default {
  name: 'ProductionTable',
  components: {GanttTable},
  data() {
    return {
      value:'',
      time:this.$store.getters.getTime.slice(0,10),
      
      
      
      orderProductionData:
        [
          {
            resource:'资源01',
            time1:'',
            time2:'订单1',
            time3:'订单2',
            time4:'',
            time5:'订单1',
            time6:'',
            time7:'订单1',
            time8:'订单2',
            time9:'',
            time10:'',
            time11:'订单1',
            time12:'订单1',
            time13:'',
            time14:'',
            time15:'',
            time16:'订单1',
            time17:'订单2',
            time18:'订单1',
            time19:'',
            time20:'订单2',
            time21:'订单1',
            time22:'',
            time23:'',
            time24:'订单2',

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
            time11:'订单2',
            time12:'订单1',
            time13:'',
            time14:'',
            time15:'',
            time16:'订单2',
            time17:'订单2',
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
  methods: {
    getProductionData(){
      this.time=this.value
      //后端交互，获取数据
    },
    exportExcel() {
      const wb = XLSX.utils.table_to_book(document.querySelector('.table'))
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet--stream' }),
          '生产单.xlsx',
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
  },
}
</script>
<style>
.main{
  background-color: #FFFFFF;
  margin:20px 20px;
  padding: 60px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}
.main:hover{
  margin:10px 20px 30px 20px;
}
.toexcel{
  display: inline;
  float: left;
  margin-left:20px;
}
.table{
  width: 750px;
  margin-bottom: 20px;
}
.date-picker{
  margin:8px 10px 2px 0px;
  float: left;
}
.button{
  float: left;
  margin:8px;
  color: #5daf34;
  width: 80px;
  border: 1px solid #5daf34;
  border-radius: 10px;
}
.button:hover {
  cursor: pointer
}
</style>
