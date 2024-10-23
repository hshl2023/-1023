<script setup lang="ts">
import { ref } from 'vue'

const statistics = ref({
  totalStudents: 1250,
  totalCourses: 48,
  activeTeachers: 86,
  averageScore: 85.5
})
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>总学生数</span>
            </div>
          </template>
          <div class="card-content">
            {{ statistics.totalStudents }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>课程总数</span>
            </div>
          </template>
          <div class="card-content">
            {{ statistics.totalCourses }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>在职教师</span>
            </div>
          </template>
          <div class="card-content">
            {{ statistics.activeTeachers }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>平均分数</span>
            </div>
          </template>
          <div class="card-content">
            {{ statistics.averageScore }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  text-align: center;
}
</style>