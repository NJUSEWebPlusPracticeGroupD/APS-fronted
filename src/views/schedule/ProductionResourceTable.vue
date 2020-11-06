<template>
  <el-main class="main">
    <div
      class="productionResourceTable"
      style="display: inline; float: left; margin-left: 20px;"
    >
      <el-table
        class="table"
        :data="tableData"
        style="width: 721px; margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="productNumber"
          label="生产单编号"
          width="180"
        />
        <el-table-column
          prop="resourceNumber"
          label="资源编号"
          width="180"
        />
        <el-table-column
          prop="resourceType"
          label="资源种类"
          width="180"
        />
        <el-table-column
          prop="resourceNum"
          label="资源数量"
          width="180"
        />
      </el-table>
    </div>
    <div
      class="toexcel"
      style="display: inline; float: left; margin-left: 4%; "
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
  name: 'ProductionResourceTable',
  data() {
    return {
      tableData: [{
        id: 1,
        productNumber: 1,
        children: [
          {
            id: 11,
            resourceNumber: 23,
            resourceType: 0,
            resourceNum: 4,
          }],

      },
      ],
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
          '生产单-资源关系表.xlsx',
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
  },
}
</script>

<style scoped>
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
  width: 500px;
  margin-bottom: 20px;
}
</style>
