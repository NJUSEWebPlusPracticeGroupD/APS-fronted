<template>
  <el-main class="main">
    <el-page-header
      v-if="!showPlanTable"
      content="生产单详情"
      @back="backToPlanTable"
    />

    <div
      v-if="!showPlanTable"
      style="float:right;margin:-30px 38px 0 0;font-size:20px"
    >
      {{ time }}
    </div>
    <div
      class="allPage"
    >
      <div
        v-if="!showPlanTable"
        class="orderProductionTable"
        style="display: inline; float: left; padding-left: 4%; "
      >
        <el-row style="margin:5px 0">
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
            @click="getOrderProductionData"
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
        <GantTable :order-production-data="orderProductionData" />
      </div>


      <div v-if="showPlanTable">
        <div
          class="planTable"
        >
          <el-table
            class="table"
            :data="tableData"
            hieght="250"
            row-key="orderNumber"
            border
            @cell-click="turnToOrderProductionTable"
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
            @click="exportExcel"
          >
            导出表单
          </el-button>
        </div>
      </div>
    </div>
  </el-main>
</template>


<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import GantTable from '@/components/GantTable'

export default {
  name: 'PlanTable',
  components: {GantTable},
  data() {
    return {
      showPlanTable:true,
      time:this.$store.getters.getTime,
      value:'',
      beginTime:'',
      lastTime:'',
      
      //plan订单需要的数据
      tableData: [{
        orderNumber: 1,
        isSplit: '否',
        startTime: '2020-01-29',
        endTime: '2020-01-29',
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
          '订单计划表.xlsx',
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },

    backToPlanTable(){
      this.showPlanTable=true
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
      this.lastTime=row.lastTime

      /*
       与后端交互
      根据time获取当天的生产单数据
      赋值给orderProductionData
       */
      console.log(row.orderNumber)
    },



    getOrderProductionData(){
      this.time=this.value
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
      overflow: hidden;
    }
    .planTable{
      display: inline;
      float: left;
      margin-left: 20px;
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
