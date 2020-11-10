<template>
  <el-main
    class="main"
    style=" background-color:rgba(255,255,255,0.8);"
  >
    <el-row>
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
        @click="getResource"
      >
        确定
      </el-button>

      <el-popover
        placement="left-start"
        style="float: right;margin-right:4%;"
        width="120"
        trigger="hover"
      >
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            延期订单:
          </div><div style="margin-left:30px;background-color:#D07473;width:50px;height:30px;display: inline-block" />
        </el-row>
        <el-row>
          <div style="vertical-align: center;display:table-cell;height: 30px;float:left;line-height: 30px">
            同一订单:<div style="margin-left:20px;vertical-align: center;display:table-cell;height: 30px;line-height: 30px">
              相同颜色
            </div>
          </div>
        </el-row>
        <el-button slot="reference">
          颜色提示
        </el-button>
      </el-popover>
    </el-row>

    <GanttChart :datas="GanntData" />
  </el-main>
</template>

<script>
import GanttChart from '@/components/GanttChart'
import {testRequest} from '@/api/APIs'
import {getResourceGantt} from '../api/APIs'
export default {
  name: 'ResourceGantt',
  components: {
    GanttChart
  },
  data() {
    return {
      value:'',
      time: this.$store.getters.getTime.slice(0,10),
      GanttFresh: false,
      GanntData:[
        {
          name: 'line1',
          fromDate: '2018-08-01 08:00',
          toDate: '2018-08-01 10:00',
          task: 'task1',
          delay: true
        },
        {
          name: 'line1',
          fromDate: '2018-08-01 12:00',
          toDate: '2018-08-01 15:00',
          task: 'task2',
          delay:true
        },
        {
          name: 'line1',
          fromDate: '2018-08-01 15:30',
          toDate: '2018-08-01 21:30',
          task: 'task4',
          delay:false
        },
        {
          name: 'line2',
          fromDate: '2018-08-01 09:00',
          toDate: '2018-08-01 11:00',
          task: 'task3',
          delay:false
        },
        {
          name: 'line2',
          fromDate: '2018-08-01 13:00',
          toDate: '2018-08-01 17:00',
          task: 'task5',
          delay:false
        },
        {
          name: 'line2',
          fromDate: '2018-08-01 11:00',
          toDate: '2018-08-01 16:00',
          task: 'task2',
          delay:false
        },
        {
          name: 'line2',
          fromDate: '2018-08-01 16:00',
          toDate: '2018-08-01 19:00',
          task: 'task4',
          delay:false
        },

        {
          name: '张三',
          fromDate: '2018-08-01 16:00',
          toDate: '2018-08-01 20:00',
          task: 'task4'
        },
        {
          name: '张三',
          fromDate: '2018-08-01 20:30',
          toDate: '2018-08-02 7:00',
          task: 'task3',
          delay: false
        },

        {
          name: 'lisi',
          fromDate: '2018-08-01 13:00',
          toDate: '2018-08-01 24:00',
          task: 'task2',
          delay: false
        }
      ]
    }
  },
  methods:{
    getResource(){
      //获取资源甘特图需要的数据，与后端交互
      // console.log("hi1");
      //
      // console.log(GanttChart.props.datas.default().length);
      // console.log(GanttChart.props.datas.default());
      // console.log("hi2");
      // GanttChart.props.datas.default().cleanData();
      // console.log(GanttChart.props.datas);
      // console.log("hi3");


      console.log(this.value)
      let tmp_datelist = this.value.toString().split(' ')
      let final_date = tmp_datelist[3]+'-'
      const monthsBig = ['1', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const months = ['00','01','02','03','04','05','06','07','08','09','10','11','12']
      for( let i = 0; i<=12;i++){
        if(tmp_datelist[1] === monthsBig[i]){
          final_date+=months[i]
        }
      }
      final_date+='-'
      final_date+=tmp_datelist[2]

      getResourceGantt(final_date).then(res => {
        console.log(res)
        console.log('MOCK注入')
        // this.GanntData = res;
      })
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
.delay{
  padding-top:1vh;
  float:right;
  margin-right: 10vh;
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
.button:hover{
  cursor: pointer;
}
</style>
