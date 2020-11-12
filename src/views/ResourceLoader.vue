<template>
  <el-main
    class="main"
    style=" background-color:rgba(255,255,255,0.8);"
  >
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
        <!--        v-model="beginTime"-->

        确定
      </el-button>
      <el-popover
        placement="left-start"
        style="float: right"
        width="130"
        trigger="hover"
      >
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            0~20% :
          </div><div style="margin-left:38px;background-color:#d6a3dc;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            20~40%  :
          </div><div style="margin-left:30px;background-color:#f7db70;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            40~60%  :
          </div><div style="margin-left:30px;background-color:#eabebf;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            60~80%  :
          </div><div style="margin-left:30px;background-color:#75cceb;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            80~100% :
          </div><div style="margin-left:22px;background-color:#94e277;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-button slot="reference">
          颜色提示
        </el-button>
      </el-popover>
    </el-row>
    <div class="datePaging">
      <!--      <i-->
      <!--        class="el-icon-caret-left"-->
      <!--        @click="preDate"-->
      <!--      />-->
      <DatePaging
        :begin-date="beginTime"
        :data="data"
        @subPreDateFtn="preDate"
        @subNextDateFtn="nextDate"
      />
    </div>
    <!--      <i-->
    <!--        class="el-icon-caret-right"-->
    <!--        @click="nextDate"-->
    <!--      />-->
    <!--    </div>-->
    <!--    <el-row-->
    <!--      v-for="(item,index1) in data"-->
    <!--      :key="index1"-->
    <!--      style="margin-bottom: 1vh"-->
    <!--    >-->
    <!--      <div class="id">-->
    <!--        {{ item.name }}-->
    <!--      </div>-->
    <!--      <div-->
    <!--        v-for="(each,index2) in item.rates"-->
    <!--        :key="index2"-->
    <!--        class="rateContainer"-->
    <!--      >-->
    <!--        <vertical-progress-bar-->
    <!--          class="rateBar"-->
    <!--          :bar-data="[{date:`${each}`,value:(`${each}`)/10}]"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </el-row>-->
  </el-main>
</template>

<script>

import DatePaging from '@/components/DatePaging'
import {getResourceLoad} from '../api/APIs'
import {request} from '../utils/request'
export default {
  name: 'ResourceLoader',
  components: {DatePaging},
  props:{

  },
  data() {
    return {
      value:'',
      totalEquipmentLoadRate: 50,
      totalPersonnelLoadRate: 80,
      beginTime: this.$store.getters.getTime.slice(0,10),
      timeString:'2018年7月5日~2018年7月13日',

      data:[
        {
          name:'line1',
          rates:[30,20,40,50,80,20,10]
        },
        {
          name:'line2',
          rates:[30,50,45,50,82,60,100]
        }
      ]
    }
  },
  mounted() {
    this.setTimeString(this.beginTime)
    this.getProgressRate()
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
      return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    },
    preDate(){
      var timeStamp=this.addTime(this.beginTime,-1)
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      this.beginTime=year + '-' + month + '-' + date
      this.setTimeString(this.beginTime)
      this.getProgressRate()
    },
    nextDate(){
      var timeStamp=this.addTime(this.beginTime,1)
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      this.beginTime=year + '-' + month + '-' + date
      this.setTimeString(this.beginTime)
      this.getProgressRate()
    },
    getRatesByTime(){
      //console.log('hi');
      var timeStamp=this.value
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      this.beginTime=year + '-' + month + '-' + date
      this.setTimeString(this.beginTime)
      this.getProgressRate()
    },

    getProgressRate(){
      //跟后端交互
      console.log('getting progress date')
      console.log(this.beginTime)
      getResourceLoad(this.beginTime).then(res => {
        if(res.content.totalEquipmentLoadRate === 'NaN'){
          this.totalEquipmentLoadRate = 0;
          this.totalPersonnelLoadRate = 0;
          this.data = [];
        }
        else{
          console.log(res.content);
          this.totalEquipmentLoadRate =  res.content.totalEquipmentLoadRate.toFixed(1);
          this.totalPersonnelLoadRate = res.content.totalPersonnelLoadRate.toFixed(1);
          this.data = res.content.resourceLoadItems;
          this.data.forEach(e=>{
            e=e.rates.forEach(f=>{
              f=f.toFixed(1);
            })
          })
          for(let i = 0; i< this.data.length;i++){
            for(let j = 0; j< this.data[i].rates.length; j++){
              this.data[i].rates[j] = this.data[i].rates[j].toFixed(1)
            }
          }
        }
      }).finally( res2 =>{
        console.log('progress date already gotten!')
      })
    },
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
