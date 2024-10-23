<script setup lang="ts">
import { ref } from 'vue'

interface Course {
  id: number
  name: string
  teacher: string
  credits: number
  capacity: number
}

const courses = ref<Course[]>([
  {
    id: 1,
    name: '高等数学',
    teacher: '王老师',
    credits: 4,
    capacity: 60
  },
  {
    id: 2,
    name: '计算机基础',
    teacher: '李老师',
    credits: 3,
    capacity: 45
  }
])

const dialogVisible = ref(false)
const form = ref({
  name: '',
  teacher: '',
  credits: '',
  capacity: ''
})

const handleAdd = () => {
  dialogVisible.value = true
}

const handleSubmit = () => {
  courses.value.push({
    id: courses.value.length + 1,
    name: form.value.name,
    teacher: form.value.teacher,
    credits: Number(form.value.credits),
    capacity: Number(form.value.capacity)
  })
  dialogVisible.value = false
  form.value = {
    name: '',
    teacher: '',
    credits: '',
    capacity: ''
  }
}
</script>

<template>
  <div class="courses-container">
    <div class="header">
      <h2>课程管理</h2>
      <el-button type="primary" @click="handleAdd">添加课程</el-button>
    </div>

    <el-table :data="courses" style="width: 100%">
      <el-table-column prop="id" label="课程编号" width="180" />
      <el-table-column prop="name" label="课程名称" width="180" />
      <el-table-column prop="teacher" label="授课教师" />
      <el-table-column prop="credits" label="学分" />
      <el-table-column prop="capacity" label="容量" />
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="添加课程">
      <el-form :model="form" label-width="80px">
        <el-form-item label="课程名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="授课教师">
          <el-input v-model="form.teacher" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="form.credits" type="number" />
        </el-form-item>
        <el-form-item label="容量">
          <el-input v-model="form.capacity" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.courses-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>