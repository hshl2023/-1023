<script setup lang="ts">
import { ref } from 'vue'

interface Teacher {
  id: number
  name: string
  title: string
  department: string
  email: string
  phone: string
}

const teachers = ref<Teacher[]>([
  {
    id: 1,
    name: '王明',
    title: '教授',
    department: '计算机科学系',
    email: 'wangming@example.com',
    phone: '13800138000'
  },
  {
    id: 2,
    name: '李华',
    title: '副教授',
    department: '软件工程系',
    email: 'lihua@example.com',
    phone: '13900139000'
  }
])

const dialogVisible = ref(false)
const editMode = ref(false)
const currentTeacher = ref<number | null>(null)

const form = ref({
  name: '',
  title: '',
  department: '',
  email: '',
  phone: ''
})

const titles = [
  '教授',
  '副教授',
  '讲师',
  '助教'
]

const departments = [
  '计算机科学系',
  '软件工程系',
  '信息安全系',
  '人工智能系'
]

const handleAdd = () => {
  editMode.value = false
  form.value = {
    name: '',
    title: '',
    department: '',
    email: '',
    phone: ''
  }
  dialogVisible.value = true
}

const handleEdit = (index: number) => {
  editMode.value = true
  currentTeacher.value = index
  const teacher = teachers.value[index]
  form.value = { ...teacher }
  dialogVisible.value = true
}

const handleDelete = (index: number) => {
  ElMessageBox.confirm(
    '确定要删除该教师信息吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      teachers.value.splice(index, 1)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

const handleSubmit = () => {
  if (editMode.value && currentTeacher.value !== null) {
    teachers.value[currentTeacher.value] = {
      ...teachers.value[currentTeacher.value],
      ...form.value
    }
  } else {
    teachers.value.push({
      id: teachers.value.length + 1,
      ...form.value
    })
  }
  dialogVisible.value = false
  form.value = {
    name: '',
    title: '',
    department: '',
    email: '',
    phone: ''
  }
}

const validateForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      handleSubmit()
    }
  })
}

const rules = {
  name: [
    { required: true, message: '请输入教师姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '请选择职称', trigger: 'change' }
  ],
  department: [
    { required: true, message: '请选择所属院系', trigger: 'change' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}
</script>

<template>
  <div class="teachers-container">
    <div class="header">
      <h2>教师管理</h2>
      <el-button type="primary" @click="handleAdd">添加教师</el-button>
    </div>

    <el-table :data="teachers" style="width: 100%">
      <el-table-column prop="id" label="工号" width="100" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="title" label="职称" width="120" />
      <el-table-column prop="department" label="所属院系" width="180" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="phone" label="联系电话" width="150" />
      <el-table-column label="操作" width="180">
        <template #default="{ $index }">
          <el-button type="primary" size="small" @click="handleEdit($index)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="editMode ? '编辑教师信息' : '添加教师'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-select v-model="form.title" placeholder="请选择职称" style="width: 100%">
            <el-option
              v-for="title in titles"
              :key="title"
              :label="title"
              :value="title"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属院系" prop="department">
          <el-select v-model="form.department" placeholder="请选择院系" style="width: 100%">
            <el-option
              v-for="dept in departments"
              :key="dept"
              :label="dept"
              :value="dept"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="validateForm(formRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.teachers-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.el-form {
  max-width: 460px;
  margin: 0 auto;
}
</style>