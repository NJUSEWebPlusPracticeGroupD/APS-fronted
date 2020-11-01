<template>
  <el-main class="main">
    <div class="onTimeDelivery">
      <el-progress
        type="circle"
        :percentage="onTimeDelivery"
        stroke-width="32"
        :status="onTimeDelivery==100?'success':''"
        width="200"
      />
      <div>{{ time }}</div>
    </div>
    <div>
      <el-date-picker
        v-model="value"
        class="date-picker"
        type="date"
        :placeholder="time"
        :default-value="time"
      />
      <el-button
        type="info"
        round
        @click="getOrder"
      >
        确定
      </el-button>
    </div>
    <el-row
      v-for="(item) in orderProgress"
      :key="item"
    >
      <el-col
        :span="5"
        style="min-height:1px;"
      />
      <el-col :span="4">
        <div
          class="orderId"
        >
          {{ item.orderId }}
        </div>
      </el-col>
      <el-col :span="10">
        <ProgressBar
          :delay-date="`${item.dateDelay}`"
          :date="`${item.date}`"
        />
      </el-col>
      <el-col
        :span="5"
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
      orderProgress:[
        {
          orderId:41234,
          date:20,
          dateDelay:10,
        },
        {
          orderId:41523,
          date:80,
          dateDelay:'',
        },
        {
          orderId:41888,
          date:60,
          dateDelay:20,
        },
        {
          orderId:51666,
          date:60,
          dateDelay:'',
        },
        {
          orderId:64850,
          date:100,
          dateDelay:'',
        },
        {
          orderId:98564,
          date:90,
          dateDelay:10,
        },
        {
          orderId:65732,
          date:30,
          dateDelay:20,
        },
        {
          orderId:41253,
          date:60,
          dateDelay:'',
        },
      ],
      value:'',
      time:this.$store.getters.getTime.slice(0,10)
    }
  },
  methods:{
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
  padding: 60px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
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
  margin-bottom: 5vh;
}
.orderId{
  height:4vh;
  border:1px solid  #f5f6fa;
  margin:1.5vh 7vh;
  padding-top:1.2vh;
}
.progress{
  height:5vh;
  margin:1.9vh 0;
}
.date-picker{
  margin-right: 30vh;
  margin-bottom: 5vh;
}
</style>
