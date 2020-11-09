<template>
  <el-main class="main">
    <div>
      <div class="totalResource">
        <div class="totalEquipmentLoad">
          <h4 style="font-size: 20px">
            设备总负载
          </h4>
          <h5>{{ timeString }}</h5>
          <el-progress
            type="circle"
            :percentage="totalEquipmentLoadRate"
            stroke-width="26"
            :color="totalEquipmentLoadRate<=20?'#d6a3dc':totalEquipmentLoadRate<=40?'#f7db70':totalEquipmentLoadRate<=60?'#eabebf':totalEquipmentLoadRate<=80?'#75cceb':'#94e277'"
            width="160"
          />
        </div>
        <div class="totalPersonnelLoad">
          <h4 style="font-size: 20px">
            人员总负载
          </h4>
          <h5>{{ timeString }}</h5>
          <el-progress
            type="circle"
            :percentage="totalPersonnelLoadRate"
            stroke-width="26"
            :color="totalPersonnelLoadRate<=20?'#d6a3dc':totalPersonnelLoadRate<=40?'#f7db70':totalPersonnelLoadRate<=60?'#eabebf':totalPersonnelLoadRate<=80?'#75cceb':'#94e277'"
            width="160"
          />
        </div>
      </div>
    </div>
    <el-row style="margin: 15px 0">
      <p style="float:left; ">
        选择查看时间：
      </p>
      <el-date-picker
        v-model="value"
        class="date-picker"
        type="date"
        :placeholder="beginTime"
        :default-value="beginTime"
      />
      <el-button
        round
        class="button"
        @click="getRatesByTime"
      >
        确定
      </el-button>
    </el-row>
    <div class="datePaging">
      <i
        class="el-icon-caret-left"
        @click="preDate"
      />
      <DatePaging :begin-date="beginTime" />
      <i
        class="el-icon-caret-right"
        @click="nextDate"
      />
    </div>
    <el-row
      v-for="(item,index1) in data"
      :key="index1"
      style="margin-bottom: 1vh"
    >
      <div class="id">
        {{ item.name }}
      </div>
      <div
        v-for="(each,index2) in item.rates"
        :key="index2"
        class="rateContainer"
      >
        <vertical-progress-bar
          class="rateBar"
          :bar-data="[{date:`${each}`,value:(`${each}`)/10}]"
        />
      </div>
    </el-row>
  </el-main>
</template>

<script>

import VerticalProgressBar from '@/components/VerticalProgressBar'
import DatePaging from '@/components/DatePaging'

export default {
  name: 'ResourceLoader',
  components: {DatePaging, VerticalProgressBar},
  props:{

  },
  data() {
    return {
      value:'',
      totalEquipmentLoadRate:50,
      totalPersonnelLoadRate:80,
      beginTime:this.$store.getters.getTime.slice(0,10),
      timeString:'2018年7月5日~2018年7月13日',
      data:[
        {
          date:'2018-07-13',
          name:'line1',
          rates:[30,20,40,50,80,20,10]
        },
        {
          date:'2018-07-13',
          name:'line2',
          rates:[30,50,45,50,82,60,100]
        }
      ]
    }
  },
  beforeMount() {
    this.setTimeString(this.beginTime)
    this.initDateRate()
  },
  methods:{
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      return year + '年' + month + '月' + date + '日'
    },
    setTimeString(time){
      var date=new Date(time)
      date.setTime(date.getTime()+7*86400000 )
      this.timeString=this.timeFormate(time)+'~'+this.timeFormate(date)
    },
    addTime(time,num){
      var date=new Date(time)
      date.setTime(date.getTime()+num*86400000 )
      return date.toString().slice(0,10)
    },
    preDate(){
      this.beginTime=this.addTime(this.beginTime,-1)
      this.setTimeString(this.beginTime)
      console.log(this.beginTime)
      //跟后端交互
    },
    nextDate(){
      this.beginTime=this.addTime(this.beginTime,1)
      this.setTimeString(this.beginTime)
      //跟后端交互
    },
    initDateRate(){
      //初始化七天的数据，跟后端交互

    },
    getRatesByTime(){
      //选择初始时间
    }
  }

}
</script>

<style scoped>

.main{
  background-color:#3f5c6d2c;
  margin:20px 20px;
  padding: 60px;
  min-height:400px;
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
.el-icon-arrow-left:hover{
  cursor: pointer;
}
.el-icon-arrow-right:hover{
  cursor: pointer;
}
.main span{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
}
.totalResource{
  height:270px;
  width:600px ;
  display: inline-block;
  margin: 0 auto;
}
.date-picker{
  margin:8px 10px 2px 10px;
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
.rateContainer{
  float: left;
  margin-left:10px;
}
.rateBar{
  display: inline-block;
  width:100px;
}
.totalEquipmentLoad{
  height:280px;
  width:230px;
  display: inline-block;
  margin: -30px 20px 20px;
}
.totalPersonnelLoad{
  height:280px;
  width:230px;
  display: inline-block;
  margin: -30px 20px 20px;
}
.datePaging{
  height:90px;
  margin-top:40px;
}
.id{
  height:60px;
  width: 90px;
  font-size: 24px;
  padding-top:20px;
  float: left;
  border: 2px solid black;
  display: inline-block;
}
.el-icon-caret-left{
  float: left;
  font-size: 55px;
  margin:5px 0 0 45px;
  cursor: pointer;
}
.el-icon-caret-right{
  float: left;
  font-size: 55px;
  margin-top:5px;
  cursor: pointer;
}
.el-icon-caret-left:hover{
  color:  rgb(236,245,255);
}
.el-icon-caret-right:hover{
  color:   rgb(236,245,255);
}
</style>
