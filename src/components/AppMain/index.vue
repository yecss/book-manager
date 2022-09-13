<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right"
    v-show="$route.path != '/home' && $route.path !== '/'"
    >
      <span class="line">|</span>
      <el-breadcrumb-item
        v-show="$route.path == '/bookinfo' || $route.path == '/booktype'"
        >图书信息管理</el-breadcrumb-item
      >
      <el-breadcrumb-item
        v-show="
          $route.path == '/kucunsearch' ||
          $route.path == '/rukusearch' ||
          $route.path == '/chukusearch'
        "
        >图书库存管理</el-breadcrumb-item
      >
      <el-breadcrumb-item
        v-show="$route.path != '/home'"
        :to="{ path: $route.path }"
      >
        {{ $route.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped>
.el-breadcrumb{
  height: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
.line{
  position: absolute;
  color: rgb(255, 255, 255);
  left: 10px;
  border-left: 4px solid rgb(30, 172, 237);
}
</style>