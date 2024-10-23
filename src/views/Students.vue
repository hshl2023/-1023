<script setup lang="ts">
import { ref } from 'vue'

interface Student {
  id: number
  name: string
  age: number
  grade: string
  major: string
}

const students = ref<Student[]>([
  {
    id: 1,
    name: '张三',
    age: 20,
    grade: '大二',
    major: '计算机科学'
  },
  {
    id: 2,
    name: '李四',
    age: 19,
    grade: '大一',
    major: '软件工程'
  }
])

const dialogVisible = ref(false)
const form = ref({
  name: '',
  age: '',
  grade: '',
  major: ''
})

const handleAdd = () => {
  dialogVisible.value = true
}

const handleSubmit = () => {
  students.value.push({
    id: students.value.length + 1,
    name: form.value.name,
    age: Number(form.value.age),
    grade: form.value.grade,
    major: form.value.major
  })
  dialogVisible.value = false
  form.value = {
    name: '',
    age: '',
    grade: '',
    major: ''
  }
}
</script>

<template>
  <div class="students-container">
    <div class="header">
      <h2>学生管理</h2>
      <el-button type="primary" @click="handleAdd">添加学生</el-button>
    </div>

    <el-table :data="students" style="width: 100%">
      <el-table-column prop="id" label="学号" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="major" label="专业" />
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="添加学生">
      <el-form :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" type="number" />
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="form.grade" placeholder="请选择年级">
            <el-option label="大一" value="大一" />
            <el-option label="大二" value="大二" />
            <el-option label="大三" value="大三" />
            <el-option label="大四" value="大四" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major" />
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
.students-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>