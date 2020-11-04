<template>
  <el-main class="main">
    <div>
      <div class="totalResource">
        <div class="totalEquipmentLoad">
          <h4>设备总负载</h4>
          <h5>{{ timeString }}</h5>
          <el-progress
            type="circle"
            :percentage="totalEquipmentLoadRate"
            stroke-width="32"
            :color="totalEquipmentLoadRate<=20?'#d6a3dc':totalEquipmentLoadRate<=40?'#f7db70':totalEquipmentLoadRate<=60?'#eabebf':totalEquipmentLoadRate<=80?'#75cceb':'#a5dee5'"
            width="200"
          />
        </div>
        <div class="totalPersonnelLoad">
          <h4>人员总负载</h4>
          <h5>{{ timeString }}</h5>
          <el-progress
            type="circle"
            :percentage="totalPersonnelLoadRate"
            stroke-width="32"
            :color="totalPersonnelLoadRate<=20?'#d6a3dc':totalPersonnelLoadRate<=40?'#f7db70':totalPersonnelLoadRate<=60?'#eabebf':totalPersonnelLoadRate<=80?'#75cceb':'#a5dee5'"
            width="200"
          />
        </div>
      </div>
    </div>
    <div class="datePaging">
      <i
        class="el-icon-arrow-left"
        style="float: left;font-size: 50px;margin-left: 8vh"
        @click="preDate()"
      />
      <DatePaging :begin-date="beginTime" />
      <i
        class="el-icon-arrow-right"
        style="font-size: 50px;float: left"
      />
    </div>
    <el-row
      v-for="(item,index1) in data"
      :key="index1"
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
    this.setTimeString()
    this.initDateRate()
  },
  methods:{
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      return year + '年' + month + '月' + date + '日'
    },
    setTimeString(){
      var date=new Date(this.beginTime)
      date.setTime(date.getTime()+7*86400000 )
      this.timeString=this.timeFormate(this.beginTime)+'~'+this.timeFormate(date)
    },
    addTime(time,num){
      var date=new Date(time)
      date.setTime(date.getTime()+num*86400000 )
      return date[0,10]
    },
    preDate(){
      this.beginTime=this.addTime(this.beginTime,-1)
      this.setTimeString()
      //跟后端交互
    },
    nextDate(){
      this.beginTime=this.addTime(this.beginTime,-1)
      this.setTimeString()
      var lastDate=this.addTime( this.beginTime,7)
      //跟后端交互
      console.log(lastDate)
    },
    initDateRate(){
      //初始化七天的数据，跟后端交互

    }
  }

}
</script>

<style scoped>

.main{
  background-color: #FFFFFF;
  margin:20px 20px;
  padding: 60px;
  height:800px;
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
  height:45vh;
  position: relative;
}
.rateContainer{
  float: left;
  margin-left: 1.5vh;
}
.rateBar{
  display: inline-block;
  width:13.6vh;
}
.totalEquipmentLoad{
  width:35vh;
  position: absolute;
  left:28vh;
  height: 100%;
  border: 0.5vh solid black;
}
.totalPersonnelLoad{
  width:35vh;
  position: absolute;
  right:28vh;
  height: 100%;
  border: 0.5vh solid black;
}
.datePaging{
  height:20vh;
  margin-top:10vh;
}
.id{
  height:8vh;
  width: 12vh;
  font-size: 3.2vh;
  padding-top:4vh;
  float: left;
  border: 0.3vh solid black;
  display: inline-block;
}
</style>
