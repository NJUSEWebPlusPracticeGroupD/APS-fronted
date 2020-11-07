<template>
  <el-main class="main">
    <el-row style="margin-top:30px">
      <div
        class="time"
        @click="timeDialog=true"
      >
        {{ time }}
      </div>
    </el-row>
    <div
      class="allPage"
    >
      <div
        style="display: inline; float: left; padding-left:20px; "
      >
        <el-row style="margin: -20px 0 30px 0">
          <el-input
            v-model="search"
            style="width:28%;float:left"
            placeholder="输入关键字搜索"
          />
        </el-row>
        <div
          class="toexcel"
        >
          <el-button
            type="primary"
            plain
            icon="el-icon-download"
            @click="exportOrderProductionExcel"
          >
            导出表单
          </el-button>
        </div>
        <GanttTable
          :order-production-data="orderProductionData"
          :search="search"
        />
      </div>
    </div>
    <el-dialog
      title="查找时间"
      :visible.sync="timeDialog"
      width="30%"
    >
      <el-date-picker
        v-model="value"
        class="date-picker"
        type="date"
        :placeholder="time"
        :default-value="time"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="timeDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="getProductionData"
        >确 定</el-button>
      </span>
    </el-dialog>
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
      timeDialog:false,
      search:'',
      
      
      
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
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      return year + '-' + month + '-' + date
    },
    getProductionData(){
      if(this.value){
        this.time=this.timeFormate(this.value)
      }
      this.timeDialog=false

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
.toexcel {
  display: inline;
  float: right;
  margin-left:20px;
}
.allPage{
  padding-top:20px;
}
.time{
  float:right;
  margin:-50px 28px 0 0;
  font-size:20px;
  border: 1px solid #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .12), 0 0 5px rgba(0, 0, 0, .04);
  border-radius: 10px;
  cursor: pointer;
  padding-top:15px;
  width:150px;
  height:40px
}
</style>
