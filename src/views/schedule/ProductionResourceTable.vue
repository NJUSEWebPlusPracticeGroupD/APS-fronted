<template>
  <el-main
    class="main"
    style=" background-color:rgba(255,255,255,0.8);"
  >
    <div
      style="overflow: hidden;margin-bottom: 20px"
    >
      <el-input
        v-model="search"
        class="search"
        style="float:left"
        placeholder="输入关键字搜索"
      />
      <el-button
        type="primary"
        class="button"
        style="float: left"
        plain
        icon="el-icon-download"
        @click="exportPlanExcel"
      >
        导出表单
      </el-button>
    </div>
    <div
      class="productionResourceTable"
      style="display: inline; float: left; margin-left: 20px;"
    >
      <el-table
        class="table"
        :data="tableData.filter(data => !search || data.orderId.toLowerCase().includes(search.toLowerCase()))"
        style="width: 721px; margin-bottom: 20px;"
        row-key="id"
      >
        <el-table-column
          prop="orderId"
          label="生产单编号"
          width="180"
          fixed
        />

        <el-table-column
          v-for="col in cols"
          :key="col.prop"
          :label="col.label"
          :prop="col.prop"
        >
          <!--          <template slot-scope="scope">-->
          <!--            <i-->
          <!--              v-if="scope.row[`${(col.prop)}`]"-->
          <!--              class="el-icon-check"-->
          <!--            />-->
          <!--          </template>-->
        </el-table-column>
      </el-table>
    </div>
  </el-main>
</template>


<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {getProduceResourceForm} from '../../api/APIs'

export default {
  name: 'ProductionResourceTable',
  data() {
    return {
      search:'',

      tableData: [
        {
          orderId:'订单01',
          resource2:'√',
          resource3:'√'
        },
        {
          orderId:'订单02',
          resource1:'√',
          resource4:'√',
        },
      ],

      cols:[
        {prop:'resource1',label:'资源1'},
        {prop:'resource2',label:'资源2'},
        {prop:'resource3',label:'资源3'},
        {prop:'resource4',label:'资源4'},
      ]
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.tableData = val
      }
    },
    cols: {
      handler(val) {
        this.cols = val
      }
    }
  },
  beforeMount() {
    this.initData()
  },

  methods: {
    initData(){
      // 初始化数据 挂载时使用


      /*
      * 获取数据
      * 使用formateTableData(resourceItems)
      * 使用formateCols(allResourceLabels)
      */
      getProduceResourceForm().then(res=>{
        console.log(res)
        this.formateTableData(res.content.resourceItems)
        this.formateCols(res.content.allResourcesLabels)
      }).finally(res2=>{
        console.log('getProduceResourceForm done!')
      })


    },

    formateTableData(data){
      this.tableData=[]
      for(let i=0;i<data.length;i++){
        var item={}
        item['orderId']=data[i].orderId
        for(let j=0;j<data[i].usedResources.length;j++){
          item[data[i].usedResources[j]]='√'
        }
        console.log(item)
        this.tableData.push(item)
      }
    },

    formateCols(data){
      this.cols=[]
      for(let i=0;i < data.length;i++){
        var item={}
        item['prop']=data[i]
        item['label']=data[i]
        this.cols.push(item)
      }

    },

    exportExcel() {
      var fix = document.querySelector('.el-table__fixed')
      var wb
      var xlsxParam = { raw: true }//转换成excel时，使用原始的格式
      if (fix) {
        wb = XLSX.utils.table_to_book(document.querySelector('.table').removeChild(fix),xlsxParam)
        document.querySelector('.table').appendChild(fix)
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector('.table'), xlsxParam)
      }
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
  background-color:#3f5c6d2c;
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
.productionResourceTable{
  height: 100%;
}
.search{
  width: 28%;
}
.button{
  margin-left: 15%;
  width:20%;
}
/*.productionResourceTable /deep/ .el-table , .el-table__expanded-cell {*/
/*  background-color: transparent;*/
/*}*/

/*.productionResourceTable /deep/ .el-table tr {*/
/*  background-color: transparent!important;*/
/*}*/
/*.productionResourceTable /deep/ .el-table th {*/
/*  background-color: transparent!important;*/
/*}*/
/*.productionResourceTable /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{*/
/*  background-color: transparent;*/
/*}*/

@media screen and (max-width: 900px) {
  .main {
    padding: 10px;
    margin: 0;
    height: 100%;
    border-radius: 0;
  }

  .main:hover {
    margin: 0;
  }
  .search{
    width: 40%;
  }
  .button{
    margin-left: 15%;
    width:40%;
  }
}
</style>
