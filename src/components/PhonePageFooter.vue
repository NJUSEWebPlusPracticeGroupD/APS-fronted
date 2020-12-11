<template>
  <el-footer
    class="footer"
    style="background-color:rgba(220,220,204,0.8);"
  >
    <el-menu
      mode="horizontal"
      class="el-menu-demo"
      background-color="transparent"
    >
      <el-menu-item
        style="width: 19%"
        index="1"
      >
        <template>
          <router-link to="/about">
            <span style=" font-size: 8px;">首页</span>
          </router-link>
        </template>
      </el-menu-item>
      <el-menu-item
        style="width: 19%"
        index="2"
      >
        <template>
          <router-link to="/resourceGantt">
            <span style=" font-size: 8px;">资源甘特</span>
          </router-link>
        </template>
      </el-menu-item>
      <el-menu-item
        style="width: 19%"
        index="3"
      >
        <template>
          <router-link to="/resourceLoader">
            <span style=" font-size: 8px;">资源负载</span>
          </router-link>
        </template>
      </el-menu-item>
      <el-menu-item
        style="width: 19%"
        index="4"
      >
        <template>
          <router-link to="/orderGantt">
            <span style=" font-size: 8px;">订单甘特</span>
          </router-link>
        </template>
      </el-menu-item>
      <el-submenu
        style="width: 19%"
        index="5"
      >
        <template slot="title">
          <span
            slot="title"
            style=" font-size: 8px;"
          >排程</span>
        </template>
        <el-menu-item-group
          class="menu-item"
          style="background-color:rgba(220,220,204,0.8);"
        >
          <router-link to="/planTable">
            <el-menu-item
              index="5-1"
              style=" font-size: 10px;"
            >
              订单计划表
            </el-menu-item>
          </router-link>
          <router-link to="/productionResourceTable">
            <el-menu-item
              index="5-3"
              style=" font-size: 10px;"
            >
              生产单-资源关系表
            </el-menu-item>
          </router-link>
          <router-link to="/productionTable">
            <el-menu-item
              index="5-4"
              style=" font-size: 10px;"
            >
              生产单
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-footer>
</template>

<script>
export default {
  name: 'PhonePageFooter',
  data(){
    return {
      isCollapse: true
    }
  }
}
</script>
  <style scoped>
    .menu{
      background-color:transparent;
    }
    .menu :not(.el-menu--collapse) {
      width: 50px;
      min-height: 30px;
    }
    .menu-item{
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      font-size: 10px;
    }
    .footer{
      display: none;
    }
    a {
      text-decoration: none;
      color:black;
    }

    .router-link-active {
      color:black;
      text-decoration: none;
    }

    @media screen and (max-width: 900px){
      .footer{
        display: flex;
        margin: 0;
        padding: 0;
      }
    }
  </style>
  

