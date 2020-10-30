<template>
  <el-main class="main">
    <h2>订单甘特图</h2>
    <span>我们致力于打造新型的工厂排程系统</span>
  </el-main>
</template>

<script>

export default {
  name: 'OrderGantt',
  data() {
    return {

    }
  },
}
</script>

<style scoped>

.main{
  background-color: #FFFFFF;
  margin:80px 60px;
  padding: 60px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
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
