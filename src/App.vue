<template>
  <div id="app">
    <el-container class="container">
      <el-header
        class="header"
        height="80px"
      >
        <el-col :span="6">
          <i
            class="el-icon-monitor"
          />
          NJUERP
        </el-col>
        <el-col
          :span="6"
          style="min-height:1px;"
        />
        <el-col
          :span="6"
          style="min-height:1px;"
        />
        <el-col
          :span="6"
          class="time-class"
        >
          <i
            class="el-icon-s-tools"
          />
          {{ time }}
        </el-col>
      </el-header>
      <el-container>
        <PageAside />
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageAside from '@/components/PageAside'
export default {
  name: 'App',
  components:{PageAside},
  data(){
    return{
      time:'2018-08-06 07:00:00',
      date:'2018-08-06 07:00:00'
    }
  },
  beforeDestroy() {
    this.clear()
  },
  created() {
    this.nowTimes()
  },
  methods:{
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      let hh =new Date(timeStamp).getHours() < 10? '0' + new Date(timeStamp).getHours(): new Date(timeStamp).getHours()
      let mm =new Date(timeStamp).getMinutes() < 10? '0' + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes()
      let ss =new Date(timeStamp).getSeconds() < 10? '0' + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds()
      this.time = year + '-' + month + '-' + date +' '+hh+':'+mm+':'+ss
    },
    dateAdd(d,num){
      var date = new Date(d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds())
      date.setTime(date.getTime()+num*1000)
      //console.log(d.toLocaleString());
      return date.getFullYear()+'-'
        +(date.getMonth()+1)
    +'-'+date.getDate()
    +' '+date.getHours()
    +':'+date.getMinutes()
    +':'+date.getSeconds()
    },
    nowTimes(){
      this.timeFormate(this.date)
      this.date=this.dateAdd(new Date(this.date),1)
      setInterval(this.nowTimes,1000)
      this.clear()
    },
    clear(){
      clearInterval(this.nowTimes)
      this.nowTimes = null
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.container{
  min-height: 700px;
  border: 1px solid #eee;
  margin: 0;
  padding: 10px 35px;
  background-color:  #f5f6fa;
}
.header {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color:  #f5f6fa;
  color: #333;
  text-align: left;
  font-size: 60px;
  line-height: 80px;
}
.time-class{
  font-size:20px;
}
html,
body {
  margin: 0;
}
</style>
