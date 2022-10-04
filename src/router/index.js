import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'login',
  component: () => import('@/components/pages/login/Login')
}, {
  path: '/',
  component: () => import('@/components/common/baseWrapper/BaseWrapper'),
  children: [{
    path: '/products',
    name: 'products',
    component: () => import('@/components/pages/products/Products')
  }]
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
