<script setup lang="ts">
</script>

<template>
  <el-container>
    <el-header>
      <nav>
        <router-link to="/teachers">教师管理</router-link>
      </nav>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style>
.el-header {
  background-color: #409EFF;
  color: white;
  line-height: 60px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 0 20px;
}

nav a:hover {
  color: #e6f1ff;
}

.el-main {
  padding: 20px;
}
</style>