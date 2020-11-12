<template>
  <el-main
    class="main"
    style=" background-color:rgba(255,255,255,0.8);"
  >
    <el-row style="margin-top:50px;margin-bottom: 0px">
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
        @click="getOrder"
      >
        确定
      </el-button>
    </el-row>
    <div class="onTimeDelivery">
      <h3 style="font-size: 30px;margin-bottom: -5px">
        按期交货率
      </h3>
      <h3>{{ timeString }}</h3>
      <el-progress
        type="circle"
        :percentage="onTimeDelivery"
        stroke-width="26"
        :color="onTimeDelivery<100?'#75cce8':onTimeDelivery<=40?'#f7db70':onTimeDelivery<=60?'#eabebf':onTimeDelivery<=80?'#75cceb':'#94e277'"
        width="160"
      />
    </div>

    <el-row style="margin-bottom: 10px;margin-top:40px;margin-left: 20px">
      <el-input
        v-model="search"
        style="width:20%;float:left"
        placeholder="输入订单编号搜索"
      />


      <div style="float: right;margin-top:-100px;margin-right:10%;">
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            延期部分:
          </div><div style="margin-left:52px;background-color:#D07473;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            已完成部分:
          </div><div style="margin-left:38px;background-color:#75cce8;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            未完成部分:
          </div><div style="margin-left:38px;background-color:#dcdccc;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            已完成订单:
          </div><div style="margin-left:38px;background-color:#94e277;width:50px;height:30px;display: inline-block" />
        </el-row>
      </div>
    </el-row>


    <div class="user_skills">
      <el-table
        :data="orderProgress.filter(data => !search || data.orderId.toString().toLowerCase().includes(search.toLowerCase()))"
        min-height="500"
        row-key="orderId"
      >
        <el-table-column
          prop="orderId"
          label="订单编号"
          height="60"
          width="200"
          align="center"
        />
        <el-table-column
          height="60"
          width="650"
          label="订单进度"
          align="center"
        >
          <template slot-scope="scope">
            <ProgressBar
              :progress-delay="scope.row.progressDelay"
              :progress="scope.row.progress"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>





    <!--    <el-row>-->
    <!--      <el-col :span="5">-->
    <!--        <div-->
    <!--          class="orderId"-->
    <!--        >-->
    <!--          订单编号-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="12">-->
    <!--        <div style="margin:1.5vh auto">-->
    <!--          订单进度-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col-->
    <!--        :span="7"-->
    <!--        style="min-height:1px;"-->
    <!--      />-->
    <!--    </el-row>-->

    <!--    <el-row-->
    <!--      v-for="(item) in orderProgress"-->
    <!--      :key="item"-->
    <!--      style="margin-bottom: 10px;"-->
    <!--    >-->
    <!--      <el-col :span="5">-->
    <!--        <div-->
    <!--          class="orderId"-->
    <!--        >-->
    <!--          {{ item.orderId }}-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="12">-->
    <!--        <ProgressBar-->
    <!--          :delay-date="`${item.dateDelay}`"-->
    <!--          :date="`${item.date}`"-->
    <!--        />-->
    <!--      </el-col>-->
    <!--      <el-col-->
    <!--        :span="7"-->
    <!--        style="min-height:1px;"-->
    <!--      />-->
    <!--    </el-row>-->
  </el-main>
</template>

<script>
import  ProgressBar from '@/components/ProgressBar'
import {getOrderGantt} from '../api/APIs'

export default {
  name: 'OrderGantt',
  components:{
    ProgressBar
  },
  data() {
    return {
      //订单搜索
      search:'',
      onTimeDelivery:100,
      timeString:'',
      orderProgress:[
        {
          orderId: 41234,
          progress: 20,
          progressDelay:10
        },
        {
          orderId:41523,
          progress: 80,
          progressDelay:''
        },
        {
          orderId:41888,
          progress: 60,
          progressDelay:20
        },
        {
          orderId:51666,
          progress: 60,
          progressDelay:''
        },
        {
          orderId:64850,
          progress:100,
          progressDelay:''
        },
        {
          orderId:98564,
          progress:90,
          progressDelay:10
        },
        {
          orderId:65732,
          progress: 30,
          progressDelay: 20
        },
        {
          orderId:41253,
          progress:60,
          progressDelay:''
        }
      ],
      value:'',
      time:this.$store.getters.getTime.slice(0,10)
    }
  },
  beforeMount() {
    this.setTimeString()
  },
  methods:{
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      return year + '年' + month + '月' + date + '日之前'
    },
    setTimeString(){
      let date=new Date(this.time)
      this.timeString=this.timeFormate(date)
    },


    getOrder(){
      var date=new Date(this.value)
      this.time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      this.setTimeString()
      //获取订单甘特数据，与后端交接
      console.log('getOrderGantt starts!')
      getOrderGantt(this.date).then(res => {
        console.log(res.content);
        this.onTimeDelivery = res.content.onTimeDelivery;
        this.orderProgress = res.content.orderGanttItems;
      }).finally(res2 =>{
        console.log('getOrderGantt finished!')
      })

    }


  }
}
</script>

<style scoped>

.user_skills{
  height: 100%;
}
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

.main{
  background-color: #FFFFFF;
  margin:20px 20px;
  padding: 20px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}
.delay{
  position: absolute;
  top:-50px;
  right:150px;
  float: right;
  padding-top:6px;
  background-color: #D07473;
  width: 50px;
  height:30px
}
.main:hover{
  margin:10px 20px 30px 20px;
}
.main h2{
  font-family: serif;
  font-size: 60px;
}
.main span{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
}

.onTimeDelivery{
  height:260px;
  width:400px;
  margin: -20px auto 30px;
  position: relative;
}
.orderId{
  height:40px;
  margin:10px 40px;
  padding-top:8px;
}

.date-picker {
  position: absolute;
  top: -50px;
  left: 10px;
}
.button{
  position: absolute;
  top: -50px;
  left: 250px;
  color: #5daf34;
  width: 80px;
  border: 1px solid #5daf34;
  border-radius: 10px;
}
.button:hover {
  cursor: pointer
}
</style>
