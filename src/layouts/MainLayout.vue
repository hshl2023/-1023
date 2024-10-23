<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User
} from '@element-plus/icons-vue'

const router = useRouter()
const isCollapse = ref(false)

const handleSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-menu
        default-active="dashboard"
        class="el-menu-vertical"
        :collapse="isCollapse"
        @select="handleSelect"
      >
        <el-menu-item index="dashboard">
          <el-icon><document /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="students">
          <el-icon><location /></el-icon>
          <span>学生管理</span>
        </el-menu-item>
        <el-menu-item index="teachers">
          <el-icon><user /></el-icon>
          <span>教师管理</span>
        </el-menu-item>
        <el-menu-item index="courses">
          <el-icon><setting /></el-icon>
          <span>课程管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>教务管理系统</h2>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

.el-aside {
  background-color: #304156;
}
</style>