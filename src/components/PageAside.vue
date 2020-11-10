<template>
  <el-aside
    class="aside"
    style=" background-color:rgba(255,255,255,0.8);"
  >
    <el-menu
      class="el-menu-vertical-demo"
      background-color="transparent"
    >
      <router-link to="/about">
        <el-menu-item
          class="menu-item"
          index="1"
        >
          <template slot="title">
            <i class="el-icon-s-home" />
            <span slot="title">首页</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/resourceGantt">
        <el-menu-item
          class="menu-item"
          index="2"
        >
          <template slot="title">
            <i class="el-icon-menu" />
            <span slot="title">资源甘特图</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/resourceLoader">
        <el-menu-item
          class="menu-item"
          index="3"
        >
          <template slot="title">
            <i class="el-icon-s-data" />
            <span slot="title">资源负载图</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/orderGantt">
        <el-menu-item
          class="menu-item"
          index="4"
        >
          <template slot="title">
            <i class="el-icon-s-order" />
            <span slot="title">订单甘特图</span>
          </template>
        </el-menu-item>
      </router-link>
      <el-submenu
        class="menu-item"
        index="5"
      >
        <template slot="title">
          <i class="el-icon-files" />
          <span
            slot="title"
            style="font-size: 18px"
          >排程</span>
        </template>
        <el-menu-item-group class="menu-item">
          <router-link to="/planTable">
            <el-menu-item index="5-1">
              订单计划表
            </el-menu-item>
          </router-link>
          <router-link to="/productionResourceTable">
            <el-menu-item index="5-3">
              生产单-资源关系表
            </el-menu-item>
          </router-link>
          <router-link to="/productionTable">
            <el-menu-item index="5-4">
              生产单
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'PageAside',
  data(){
    return {
      isCollapse: true
    }
  }
}
</script>

<style scoped>
.aside{
  background-color:#3f5c6d2c;
  width: 200px;
  min-height: 400px;
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
.menu :not(.el-menu--collapse) {
  width: 50px;
  min-height: 30px;
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
