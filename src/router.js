import { createRouter, createWebHistory } from 'vue-router'
import CreateUser from './Views/CreateUser.vue'
import UpdateUser from './Views/UpdateUser.vue'
import DeleteUser from './Views/DeleteUser.vue'
import ReadUser from './Views/ReadUser.vue'

const routes = [
  { path: '/create-user', component: CreateUser },
  { path: '/update-user', component: UpdateUser },
  { path: '/delete-user', component: DeleteUser },
  { path: '/', component: ReadUser }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
