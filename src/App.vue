<template>
  <div id="app">
    <el-container class="container">
      <el-header
        class="header"
        height="80px"
      >
        <el-col :span="8">
          <i
            class="el-icon-monitor"
          />
          NJUERP
        </el-col>
        <el-col
          :span="10"
          style="min-height:1px;"
        />
        <el-col
          :span="6"
          class="time-class"
        >
          <i
            class="el-icon-s-tools"
            @click="saveTime"
          />
          {{ this.$store.getters.getTime }}
        </el-col>
      </el-header>
      <el-container style = "height: 500px">
        <PageAside />
        <router-view />
      </el-container>
    </el-container>
    <el-dialog
      title="修改时间"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
    >
      调整时间:
      <el-date-picker
        v-model="value"
        class="date-picker"
        style="width: 50%; margin-left:22%;"
        type="datetime"
        :placeholder="this.$store.getters.getTime"
        :default-value="this.$store.getters.getTime"
      />
      <div />
      更改时间速度（默认1s）:
      <el-input
        v-model="input"
        class="input"
        placeholder="请输入秒数的倍数"
        style="width: 50%"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="setTime"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PageAside from '@/components/PageAside'
export default {
  name: 'App',
  components:{PageAside},
  data(){
    return{
      value:'',
      input:1,
      dialogVisible:false,
    }
  },
  created() {
    this.nowTimes()
  },
  methods:{

    //格式化时间戳
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =new Date(timeStamp).getMonth() + 1 < 10? '0' + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1
      let date =new Date(timeStamp).getDate() < 10? '0' + new Date(timeStamp).getDate(): new Date(timeStamp).getDate()
      let hh =new Date(timeStamp).getHours() < 10? '0' + new Date(timeStamp).getHours(): new Date(timeStamp).getHours()
      let mm =new Date(timeStamp).getMinutes() < 10? '0' + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes()
      let ss =new Date(timeStamp).getSeconds() < 10? '0' + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds()
      var time= year + '-' + month + '-' + date +' '+hh+':'+mm+':'+ss
      this.$store.commit('setTime',time)
    },
    //增加时间，num代表多少秒
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
    //现在的虚拟时间
    nowTimes(){
      var time=this.dateAdd(new Date(this.$store.getters.getTime),this.$store.getters.getTimeOfSecond)
      this.timeFormate(time)
      setInterval(this.nowTimes,1000)
      this.clear()
    },
    //清空计时器
    clear(){
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },

    //设置时间和改变时间速率
    setTime(){
      this.$store.commit('setTime',this.value)
      this.$store.commit('setTimeOfSecond',this.input)
      this.clear()
      this.dialogVisible=false
    },

    //时间dialog进入前
    saveTime(){
      this.value=this.$store.getters.getTime
      this.clear()
      this.dialogVisible=true
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  zoom: 1;
  background-image: url("~@/assets/cloud.jpg");
  background-repeat: initial;
  background-size: auto;
  background-position: center 0;
  opacity: 1;
}
.container{
  min-height: 100%;
  width: 100%;
  border: 1px solid #eee;
  margin: 0;
  padding: 10px 35px;
  background-color:  transparent;
}
.header {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #000000;
  text-align: left;
  font-size: 60px;
  font-weight: bold;
  font-family: "Papyrus";
  line-height: 10%;
  width: 100%;

}
.time-class{
  font-size:20px;
margin-top: 20px;
}
.el-icon-s-tools:hover{
  cursor: pointer;
}
.el-icon-monitor{

}
.input{
  margin-top:4vh;
}
html,
body {
  margin: 0;
}
</style>
