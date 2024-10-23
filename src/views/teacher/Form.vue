<template>
  <div class="teacher-form">
    <h1>{{ isEdit ? '编辑教师' : '添加教师' }}</h1>
    
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="form"
    >
      <el-form-item label="工号" prop="employeeId">
        <el-input v-model="form.employeeId" />
      </el-form-item>
      
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      
      <el-form-item label="所属院系" prop="department">
        <el-input v-model="form.department" />
      </el-form-item>
      
      <el-form-item label="职称" prop="title">
        <el-select v-model="form.title" placeholder="请选择职称">
          <el-option label="教授" value="教授" />
          <el-option label="副教授" value="副教授" />
          <el-option label="讲师" value="讲师" />
          <el-option label="助教" value="助教" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="$router.push('/teachers')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeacherStore } from '../../stores/teacher'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
const teacherStore = useTeacherStore()
const formRef = ref<FormInstance>()

const isEdit = route.params.id !== undefined

const form = ref({
  employeeId: '',
  name: '',
  department: '',
  title: '',
  email: '',
  phone: ''
})

const rules: FormRules = {
  employeeId: [{ required: true, message: '请输入工号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  department: [{ required: true, message: '请输入所属院系', trigger: 'blur' }],
  title: [{ required: true, message: '请选择职称', trigger: 'change' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }]
}

onMounted(() => {
  if (isEdit && route.params.id) {
    const teacher = teacherStore.getTeacher(Number(route.params.id))
    if (teacher) {
      form.value = { ...teacher }
    }
  }
})

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit && route.params.id) {
        teacherStore.updateTeacher(Number(route.params.id), form.value)
      } else {
        teacherStore.addTeacher(form.value)
      }
      router.push('/teachers')
    }
  })
}
</script>

<style scoped>
.teacher-form {
  padding: 20px;
}

.form {
  max-width: 600px;
  margin: 20px auto;
}
</style>