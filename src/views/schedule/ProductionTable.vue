<template>
  <el-main
    class="main"
    style=" background-color:rgba(255,255,255,0.8);"
  >
    <el-row>
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
        style="overflow:hidden;width: 100% "
      >
        <el-input
          v-model="search"
          class="search"
          style="float:left"
          placeholder="输入关键字搜索"
        />
        <el-button
          type="primary"
          plain
          class="button"
          icon="el-icon-download"
          @click="exportOrderProductionExcel"
        >
          导出表单
        </el-button>
        <el-row style="margin-top: 20px">
          <GanttTable
            :order-production-data="orderProductionData"
            :search="search"
          />
        </el-row>
      </div>
    </div>
    <el-dialog
      title="查找时间"
      :visible.sync="timeDialog"
      class="select"
      :modal-append-to-body="false"
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
import {getProduceForm} from '../../api/APIs'

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
          }
        ]
    }
  },
  beforeMount() {
    this.value=this.time
    this.getProductionData()
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
      console.log('hi')
      getProduceForm(this.time).then(res=>{
        console.log(res)
        this.orderProductionData = []
        for(var i = 0; i< res.content.length;i++){
          let tmp_obj = {
            resource: res.content[i].resource
          }
          for(var j = 1; j<=24; j++){
            const index = 'time' + j.toString()
            tmp_obj[index] = res.content[i].orderFor24Hours[j-1]
          }
          this.orderProductionData.push(tmp_obj)
        }
      }).finally(res2=>{
        console.log(this.orderProductionData)
        console.log('getProduceForm done!')
      })
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
  margin:20px 0;
}
.time{
  float:left;
  margin:-40px 0 0 0;
  font-size:20px;
  border: 1px solid #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .12), 0 0 5px rgba(0, 0, 0, .04);
  border-radius: 10px;
  cursor: pointer;
  padding-top:15px;
  width:150px;
  height:40px
}
.search{
       width: 28%;
}
.button{
  margin-left: 15%;
  width:20%;
}
.select{
  width: 100%;
  position: static;
}
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
  .select{
    width: 500px;
    position: absolute;
    left:-20%;
  }
  .time{
    margin:10px 0 0;
    font-size:16px;
    border: 0.5px solid #fff;
    box-shadow: 0 0.5px 2.5px rgba(0, 0, 0, .12), 0 0 5px rgba(0, 0, 0, .04);
    border-radius: 6px;
    cursor: pointer;
    padding-top:10px;
    width:40%;
    height:30px

  }
}
</style>
