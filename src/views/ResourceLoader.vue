<template>
  <el-main class="main">
    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
      />
    </div>
    <VerticalProgressBar />
  </el-main>
</template>

<script>

import VerticalProgressBar from '@/components/VerticalProgressBar'
export default {
  name: 'ResourceLoader',
  components: {VerticalProgressBar},
  data() {
    return {
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
