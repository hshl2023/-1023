import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Teacher {
  id: number
  name: string
  employeeId: string
  department: string
  title: string
  email: string
  phone: string
}

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = ref<Teacher[]>([])
  
  function addTeacher(teacher: Omit<Teacher, 'id'>) {
    const id = teachers.value.length + 1
    teachers.value.push({ ...teacher, id })
  }
  
  function updateTeacher(id: number, data: Partial<Teacher>) {
    const index = teachers.value.findIndex(t => t.id === id)
    if (index !== -1) {
      teachers.value[index] = { ...teachers.value[index], ...data }
    }
  }
  
  function deleteTeacher(id: number) {
    teachers.value = teachers.value.filter(t => t.id !== id)
  }
  
  function getTeacher(id: number) {
    return teachers.value.find(t => t.id === id)
  }
  
  return {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacher
  }
})