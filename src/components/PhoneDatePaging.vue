<template>
  <div class="user_skills">
    <el-table
      style="background-color: transparent"
      :data="tableData"
      row-key="name"
    >
      <el-table-column
        prop="name"
        height="40"
        width="70"
        align="center"
      >
        <template
          slot="header"
        >
          <i
            style="font-size:20px"
            class="el-icon-caret-left table-header-icon"
            @click="preDate"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-for="date in dates"
        :key="date"
        height="40"
        width="70"
        :label="date"
        :prop="date"
        align="center"
      >
        <template slot-scope="scope">
          <vertical-progress-bar
            :bar-data="[{'data':scope.row[`${(date)}`].toString(),'value':(scope.row[`${(date)}`])/10}]"
          />
        </template>
      </el-table-column>
      <el-table-column
        height="40"
        width="60"
        align="center"
      >
        <template
          slot="header"
        >
          <i
            style="font-size:20px"
            class="el-icon-caret-right table-header-icon"
            @click="nextDate"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import VerticalProgressBar from '@/components/VerticalProgressBar'
export default {
  name: 'PhoneDatePaging',
  components: {VerticalProgressBar},
  props:{
    beginDate:{
      type:String,
    },
    data:{
      type:Array,
    }
  },
  data(){
    return{
      tableData:[],
      dates:[]
    }
  },
  watch:{
    beginDate: {
      handler() {
        this.getTableData()
      }
    },
    data: {
      handler() {
        this.getTableData()
      }
    },
  },
  beforeMount() {
    this.getTableData()
  },
  methods:{
    getTableData(){
      console.log('data:')
      console.log(this.data)
      this.tableData=[]
      this.dates=[]
      for(let i=0;i<7;i++){
        this.dates.push(this.addTime(this.beginDate,i))
      }
      var data=this.data
      for(let j=0;j<data.length;j++){
        var item={}
        item['name']=data[j]['name']
        for(let i=0;i<7;i++){
          item[this.dates[i]]=data[j]['rates'][i]
        }
        this.tableData.push(item)
      }
    },

    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      return year + '-' + month + '-' + date
    },
    addTime(time,num){
      var date=new Date(time)
      date.setTime(date.getTime()+num*86400000 )
      return this.timeFormate(date)
    },
    preDate() {
      //响应父组件的方法，其中subClickFtn为父组件的点击事件
      this.$emit('subPreDateFtn')
    },
    nextDate() {
      //响应父组件的方法，其中subClickFtn为父组件的点击事件
      this.$emit('subNextDateFtn')
    }
  }
}
</script>

<style scoped>
.user_skills /deep/ .el-table , .el-table__expanded-cell {
  background-color: transparent;
}

.user_skills /deep/ .el-table tr {
  background-color: transparent!important;
}
.user_skills /deep/ .el-table th {
  background-color: transparent!important;
}
.user_skills /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
  background-color: transparent;
}
.item-date{
  display: inline-block;
  width:15%;
  height:40px;
  padding-top:20px;
  float: left;
  border: 2px solid black;
}
.table-header-icon{
  cursor: pointer;
  font-size: 20px;
}
</style>
