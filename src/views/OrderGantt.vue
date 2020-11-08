<template>
  <el-main class="main">
    <div class="onTimeDelivery">
      <h3 style="font-size: 30px;margin-bottom: -5px">
        按期交货率
      </h3>
      <h3>{{ timeString }}</h3>
      <el-progress
        type="circle"
        :percentage="onTimeDelivery"
        stroke-width="26"
        :color="onTimeDelivery<=20?'#d6a3dc':onTimeDelivery<=40?'#f7db70':onTimeDelivery<=60?'#eabebf':onTimeDelivery<=80?'#75cceb':'#94e277'"
        width="160"
      />
    </div>
    <el-row style="position:relative;margin-bottom: 10px">
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
      <div class="delay">
        延期
      </div>
    </el-row>
    <el-row>
      <el-col :span="5">
        <div
          class="orderId"
        >
          订单编号
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin:1.5vh auto">
          订单进度
        </div>
      </el-col>
      <el-col
        :span="7"
        style="min-height:1px;"
      />
    </el-row>

    <el-row
      v-for="(item) in orderProgress"
      :key="item"
      style="margin-bottom: 10px;"
    >
      <el-col :span="5">
        <div
          class="orderId"
        >
          {{ item.orderId }}
        </div>
      </el-col>
      <el-col :span="12">
        <ProgressBar
          :delay-date="`${item.dateDelay}`"
          :date="`${item.date}`"
        />
      </el-col>
      <el-col
        :span="7"
        style="min-height:1px;"
      />
    </el-row>
  </el-main>
</template>

<script>
import  ProgressBar from '@/components/ProgressBar'
export default {
  name: 'OrderGantt',
  components:{
    ProgressBar
  },
  data() {
    return {
      onTimeDelivery:100,
      timeString:'',
      orderProgress:[
        {
          orderId:41234,
          date: 20,
          dateDelay:10
        },
        {
          orderId:41523,
          date: 80,
          dateDelay:''
        },
        {
          orderId:41888,
          date: 60,
          dateDelay:20
        },
        {
          orderId:51666,
          date: 60,
          dateDelay:0
        },
        {
          orderId:64850,
          date:100,
          dateDelay:0
        },
        {
          orderId:98564,
          date:90,
          dateDelay:10
        },
        {
          orderId:65732,
          date: 30,
          dateDelay: 20
        },
        {
          orderId:41253,
          date:60,
          dateDelay:0
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
      //获取订单甘特数据，与后端交接
    }


  }
}
</script>

<style scoped>

.main{
  background-color: #FFFFFF;
  margin:20px 20px;
  padding: 40px;
  min-height: 400px;
  position: relative;
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
  left: 60px;
}
.button{
  position: absolute;
  top: -50px;
  left: 290px;
  color: #5daf34;
  width: 80px;
  border: 1px solid #5daf34;
  border-radius: 10px;
}
.button:hover {
  cursor: pointer
}
</style>
