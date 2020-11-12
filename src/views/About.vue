<template>
  <el-main class="main">
    <h2>NJU—APS</h2>
    <span>我们致力于打造新型的工厂排程系统</span>
    <el-row style="margin-top: 30px">
      <el-button
        type="primary"
        :loading="load"
        @click="start"
      >
        进行排程
      </el-button>
    </el-row>
  </el-main>
</template>

<script>
import {startAPS} from '../api/APIs'
export default {
  name: 'About',
  data() {
    return {
      load:false,
    }
  },
  methods:{
    start(){
      this.load=true
      //与后端交互，一旦完成交互  load=false
      const date = this.$store.getters.getTime.slice(0,19)
      //console.log(date);
      startAPS(date).then(res=>{
        console.log(res)
      }).finally(res1 => {
        this.load = false
        console.log('排程结束!')
      })
    }
  }

}
</script>

<style scoped>

  .main{
    /*background-color:#3f5c6d2c;*/
    background-color:rgba(255,255,255,0.8);
    margin:20px 20px;
    padding: 40px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
  }
  .main:hover{
    margin:10px 20px;
  }
  .main h2{
    font-family: serif;
    font-size: 60px;
  }
  .main span{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
  }

</style>
