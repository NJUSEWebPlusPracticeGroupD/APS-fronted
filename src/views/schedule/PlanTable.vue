<template>
  <el-main
    class="main"
    style=" background-color:rgba(255,255,255,0.8);"
  >
    <div
      v-if="showPlanTable"
      style="overflow: hidden;margin-bottom: 20px"
    >
      <el-input
        v-model="search"
        style="width:28%;float:left"
        placeholder="输入关键字搜索"
      />
    </div>
    <el-page-header
      v-if="!showPlanTable"
      content="生产单详情"
      @back="backToPlanTable"
    />
    <div
      v-if="!showPlanTable"
      class="time"
      @click="timeDialog=true"
    >
      {{ time }}
    </div>
    <div
      class="allPage"
    >
      <div
        v-if="!showPlanTable"
        style="display: inline; float: left; padding-left: 20px;width:100%"
      >
        <el-row style="margin: 10px 0">
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


      <div v-if="showPlanTable">
        <div
          class="planTable"
        >
          <el-table
            class="table"
            :data="tableData.filter(data => !search || data.orderNumber.toString().toLowerCase().includes(search.toLowerCase()))"
            height="500"
            row-key="orderNumber"
          >
            <el-table-column
              prop="orderNumber"
              label="订单编号"
              width="150"
            />
            <el-table-column
              prop="isSplit"
              label="是否拆分"
              width="150"
            />
            <el-table-column
              prop="startTime"
              label="开始时间"
              width="150"
            />
            <el-table-column
              prop="endTime"
              label="结束时间"
              width="150"
            />
            <el-table-column
              label="生产单"
              width="150"
            >
              <template slot-scope="scope">
                <i
                  v-if="scope.row.turnToOrderProductionTable"
                  class="el-icon-right"
                  @click="turnToOrderProductionTable(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
          class="toexcel"
        >
          <el-button
            type="primary"
            plain
            icon="el-icon-download"
            @click="exportPlanExcel"
          >
            导出表单
          </el-button>
        </div>
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
        :placeholder="time"
        :default-value="time"
        type="date"
        :picker-options="pickerOptions"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="timeDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="getOrderProductionData"
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
  name: 'PlanTable',
  components: {GanttTable},
  data() {
    return {
      timeDialog:false,
      search:'',
      showPlanTable:true,
      time:this.$store.getters.getTime,
      value:'',
      beginTime:'',
      lastTime:'',

      //设置时间限制
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > new Date(this.lastTime).getTime() || time.getTime() <  new Date(this.beginTime).getTime()
        }
      },

      
      //plan订单需要的数据
      tableData: [{
        orderNumber: 1,
        isSplit: '否',
        startTime: '2020-01-29',
        endTime: '2020-01-31',
        turnToOrderProductionTable:true
      }, {
        orderNumber: 2,
        isSplit: '是',
        startTime: '2020-01-29',
        endTime: '2020-01-29',
        turnToOrderProductionTable:true,
        children: [
          {
            orderNumber: 21,
            startTime: '2020-01-29',
            endTime: '2020-01-29',
            turnToOrderProductionTable:false,
          },
          {
            orderNumber: 21,
            startTime: '2020-01-29',
            endTime: '2020-01-29',
            turnToOrderProductionTable:false,
          },
          {
            orderNumber: 23,
            startTime: '2020-01-29',
            endTime: '2020-01-29',
            turnToOrderProductionTable:false,
          },
        ],
      }, {
        orderNumber: 3,
        isSplit: '是',
        startTime: '2020-01-29',
        endTime: '2020-01-29',
        turnToOrderProductionTable:true,
        children: [{
          orderNumber: 31,
          startTime: '2020-01-29',
          endTime: '2020-01-29',
          turnToOrderProductionTable:false,
        }, {
          orderNumber: 32,
          startTime: '2020-01-29',
          endTime: '2020-01-29',
          turnToOrderProductionTable:false,
        }],
      }, {
        orderNumber: 4,
        startTime: '2020-01-29',
        endTime: '2020-01-29',
        isSplit: '否',
        turnToOrderProductionTable:true,
      }],
      
      
      //生产单需要的数据
      orderProductionData: 
        [
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
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      return year + '-' + month + '-' + date
    },
    exportExcel(id,title){
      var fix = document.querySelector('.el-table__fixed')
      var wb
      var xlsxParam = { raw: true }//转换成excel时，使用原始的格式
      if (fix) {
        wb = XLSX.utils.table_to_book(document.querySelector(id).removeChild(fix),xlsxParam)
        document.querySelector(id).appendChild(fix)
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam)
      }
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet--stream' }),
          title+'.xlsx',
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    exportOrderProductionExcel(){
      this.exportExcel('.orderProductionTable','订单-生产单关系表')
    },
    exportPlanExcel() {
      this.exportExcel('.table','订单表')
    },

    backToPlanTable(){
      this.showPlanTable=true
      this.search=''
    },

    turnToOrderProductionTable(row){
      this.showPlanTable=false
      /*
      先获取row.startTime
      赋值给time和beginTime

      获取row.lastTime
      赋值给lastTime
       */

      this.beginTime=row.startTime
      this.time=this.beginTime
      this.lastTime=row.endTime
      this.search=''

      /*
       与后端交互
      根据time获取当天的生产单数据
      赋值给orderProductionData
       */
      console.log(row.orderNumber)
    },



    getOrderProductionData(){
      if(this.value){
        this.time=this.timeFormate(this.value)
      }
      this.timeDialog=false
      /*
      与后端交互
     根据time获取当天的生产单数据
     赋值给orderProductionData
      */
    }
  },

}
</script>

<style>
    .allPage {
      padding-top:20px;
    }
    .planTable{
      display: inline;
      float: left;
      margin-left: 20px;
    }
    .planTable{
      height: 100%;
    }
    .planTable /deep/ .el-table , .el-table__expanded-cell {
      background-color: transparent;
    }

    .planTable /deep/ .el-table tr {
      background-color: transparent!important;
    }
    .planTable /deep/ .el-table th {
      background-color: transparent!important;
    }
    .planTable /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
      background-color: transparent;
    }
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
      float: right;
      margin-left:20px;
    }
    .table{
     width: 750px;
      margin-bottom: 20px;
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
