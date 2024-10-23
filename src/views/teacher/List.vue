<template>
  <div class="teacher-list">
    <div class="header">
      <h1>教师管理</h1>
      <el-button type="primary" @click="$router.push('/teachers/new')">添加教师</el-button>
    </div>
    
    <el-table :data="teacherStore.teachers" style="width: 100%">
      <el-table-column prop="employeeId" label="工号" width="120" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="department" label="所属院系" width="180" />
      <el-table-column prop="title" label="职称" width="120" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button
            size="small"
            @click="$router.push(`/teachers/${row.id}/edit`)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useTeacherStore } from '../../stores/teacher'
import { ElMessageBox } from 'element-plus'

const teacherStore = useTeacherStore()

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这位教师吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    teacherStore.deleteTeacher(id)
  } catch {
    // User cancelled deletion
  }
}
</script>

<style scoped>
.teacher-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}
</style>