<template>
  <el-main class="main">
    <ProgressBar
      :option="option"
      value="50"
    />
  </el-main>
</template>

<script>
import ProgressBar from 'vuejs-progress-bar'

export default {
  name: 'ResourceLoader',
  components:{ProgressBar},
  data() {
    return {
      option: {
        text: {
          color: '#FFFFFF',
          shadowEnable: true,
          shadowColor: '#000000',
          fontSize: 14,
          fontFamily: 'Helvetica',
          dynamicPosition: false,
          hideText: false
        },
        progress: {
          color: '#2dbd2d',
          backgroundColor: '#333333'
        },
        layout: {
          height: 35,
          width: 140,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: 'ciclre '
        }
      }
    }
  },
}
</script>

<style scoped>

.main{
  background-color: #FFFFFF;
  margin:20px 20px;
  padding: 60px;
  overflow-scrolling: auto;
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
.main span{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
}
</style>
