import { createRouter, createWebHistory } from 'vue-router'
import TeacherList from '../views/teacher/List.vue'
import TeacherForm from '../views/teacher/Form.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teachers',
      name: 'teachers',
      component: TeacherList
    },
    {
      path: '/teachers/new',
      name: 'new-teacher',
      component: TeacherForm
    },
    {
      path: '/teachers/:id/edit',
      name: 'edit-teacher',
      component: TeacherForm
    }
  ]
})

export default router