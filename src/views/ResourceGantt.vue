<template>
  <el-main class="main">
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
    </el-row>
    <div class="delay">
      延期
    </div>
    <GanttChart />
  </el-main>
</template>

<script>
import GanttChart from '@/components/GanttChart'
export default {
  name: 'ResourceGantt',
  components: {GanttChart},
  data() {
    return {
      value:'',
      time:this.$store.getters.getTime.slice(0,10)
    }
  },
  methods:{
    getResource(){
      //获取资源甘特图需要的数据，与后端交互
      console.log(this.value)
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
