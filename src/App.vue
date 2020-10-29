<template>
  <div id="app">
    <el-container class="container">
      <el-header
        class="header"
        height="80px"
      >
        <i class="el-icon-monitor"></i>
        NJUERP
      </el-header>
      <el-container>
        <PageAside />
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageAside from '@/components/PageAside'
export default {
  name: 'App',
  components:{PageAside}
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
  overflow:scroll;
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
html,
body {
  margin: 0;
}
</style>
