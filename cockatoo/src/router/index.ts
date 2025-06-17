import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Privacy from '@/pages/Privacy.vue'
import NotFound from '@/pages/NotFound.vue'
import Profile from '@/pages/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/privacy', component: Privacy },
  { path: '/profile/:id', component: Profile },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
