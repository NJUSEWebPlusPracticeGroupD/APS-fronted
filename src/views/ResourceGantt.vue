<template>
  <el-main class="main">
    <el-date-picker
      class="date-picker"
      type="date"
      placeholder="选择日期"
      :default-value="defaultTime"
    />
    <el-button
      type="info"
      round
    >
      确定
    </el-button>
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
      defaultTime: new Date(2018,7,12)

    }
  },
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
.date-picker{
  margin-right: 40vh;
  margin-bottom: 5vh;
}
</style>
