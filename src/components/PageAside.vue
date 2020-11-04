<template>
  <el-aside class="aside">
    <el-menu class="menu">
      <router-link to="/about">
        <el-menu-item class="menu-item" index="1">
          <template slot="title">
            <i class="el-icon-s-home"></i>首页
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/resourceGantt">
        <el-menu-item class="menu-item" index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>资源甘特图
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/resourceLoader">
        <el-menu-item class="menu-item" index="3">
          <template slot="title">
            <i class="el-icon-s-data"></i>资源负载图
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/orderGantt">
        <el-menu-item class="menu-item" index="4">
          <template slot="title">
            <i class="el-icon-s-order"></i>订单甘特图
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/schedule">
        <el-menu-item class="menu-item" index="5">
          <template slot="title">
            <i class="el-icon-s-tools"></i>排程
          </template>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'PageAside'
}
</script>

<style scoped>
.aside{
  background:#f5f6fa;;
  width: 200px;
  min-height:500px;
  margin:20px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .04);
}
.aside:hover{
  margin:10px 20px;
}
.menu{
  background-color:transparent;
}
.menu-item{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 10px 0;
  font-size: 18px;
}
a {
  text-decoration: none;
  color:black;
}

.router-link-active {
  color:black;
  text-decoration: none;
}
</style>
