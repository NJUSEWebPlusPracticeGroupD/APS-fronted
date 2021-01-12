<template>
  <el-main class="main">
    <h2>NJU—APS</h2>
    <span>我们致力于打造新型的工厂排程系统</span>
    <div class="phone-time">
      {{ this.$store.getters.getTime }}
    </div>
    <el-row style="margin-top: 30px">
      <el-select
        v-model="value"
        class="select_aps"
        placeholder="请选择排程方式"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-if="!loaded"
        type="primary"
        :loading="load"
        @click="start"
      >
        进行排程
      </el-button>
      <el-button
        v-if="loaded"
        :loading="load"
        disabled
        @click="start"
      >
        已排程
      </el-button>
    </el-row>
  </el-main>
</template>

<script>
import {startHighestResourceRateAps, startLowestOrderDelayedAps} from '../api/APIs'
export default {
  name: 'About',
  data() {
    return {
      loaded:false,
      load:false,
      value:'',
      options:[
        {
          value:'high_resource',
          label:'高资源利用率排程'
        },
        {
          value:'low_delay',
          label:'最小延期率排程'
        }
      ]
    }
  },
  methods:{
    start(){
      console.log(this.value)
      if(!this.value.toString()){
        alert('请选择排程方式')
      }
      else{
        this.load=true
        //与后端交互，一旦完成交互  load=false
        const date = this.$store.getters.getTime.slice(0,14) + '00:00'
        console.log(date)
        if(this.value=='high_resource'){
          //修改这块的api
          startHighestResourceRateAps(date).then(res=>{
            console.log(res)
          }).finally(() => {
            this.load = false
            console.log('排程结束!')
            this.loaded=true
          })
        }
        else{
          //修改这块的api
          startLowestOrderDelayedAps(date).then(res=>{
            console.log(res)
          }).finally(() => {
            this.load = false
            console.log('排程结束!')
            this.loaded=true
          })
        }
      }


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

  }
  .main h2{
    font-family: serif;
    font-size: 60px;
  }
  .main span{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
    line-height: 40px;
  }
  .phone-time{
    display: none;
  }


  /*响应式编程*/
  @media screen and (max-width: 900px) {
    .phone-time{
      display: flex;
      justify-content: center;
      font-family: serif;
      font-size: 20px;
    }
    .main:hover{
      margin:0;
    }
    .main h2{
      font-size: 40px;
    }
    .main{
      padding:40px;
      margin:0;
      height: 100%;
      border-radius:0;
    }
    .select_aps{
      margin: 30px;
    }

  }
</style>
