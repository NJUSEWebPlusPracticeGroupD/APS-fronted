<template>
  <el-main class="main">
    <el-page-header
      v-if="showPlanTable"
      content="订单详情"
      @back="backToPlanTable"
    />
    <div class="allPage">
      <div
        class="planTable"
      >
        <el-table
          class="table"
          :data="tableData"
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
  </el-main>
</template>


<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'PlanTable',
  data() {
    return {
      showPlanTable:false,
      tableData: [{
        orderNumber: 1,
        isSplit: '否',
        startTime: '2020-01-29',
        endTime: '2020-01-29',
      }, {
        orderNumber: 2,
        isSplit: '是',
        startTime: '2020-01-29',
        endTime: '2020-01-29',
        children: [
          {
            orderNumber: 21,
            startTime: '2020-01-29',
            endTime: '2020-01-29',
          },
          {
            orderNumber: 21,
            startTime: '2020-01-29',
            endTime: '2020-01-29',
          },
          {
            orderNumber: 23,
            startTime: '2020-01-29',
            endTime: '2020-01-29',
          },
        ],
      }, {
        orderNumber: 3,
        isSplit: '是',
        startTime: '2020-01-29',
        endTime: '2020-01-29',
        children: [{
          orderNumber: 31,
          startTime: '2020-01-29',
          endTime: '2020-01-29',
        }, {
          orderNumber: 32,
          startTime: '2020-01-29',
          endTime: '2020-01-29',
        }],
      }, {
        orderNumber: 4,
        startTime: '2020-01-29',
        endTime: '2020-01-29',
        isSplit: '否',
      }],
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
    turnToOrderProductionTable(row){
      console.log(row.orderNumber)
    }
  },

}
</script>

<style>
    .allPage {
        height: 10px;
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
</style>
