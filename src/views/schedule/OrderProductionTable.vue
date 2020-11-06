<template>
  <el-main class="main">
    <div
      class="orderProductionTable"
      style="display: inline; float: left; padding-left: 4%; "
    >
      <el-table
        class="table"
        :data="tableData"
        border
      >
        <el-table-column
          prop="order"
          label="订单"
          width="250"
        />
        <el-table-column
          prop="production"
          label="生产单"
          width="250"
        />
      </el-table>
    </div>
    <div
      class="toexcel"
      style="display: inline; float: left; padding-left: 10%; "
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
  </el-main>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      tableData: [{
        order: 12349,
        production: 2234,
      }, {
        order: 12349,
        production: 2234,
      }, {
        order: 12349,
        production: 2234,
      }, {
        order: 12349,
        production: 2234,
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
          '订单-生产单关系表.xlsx',
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
</style>
