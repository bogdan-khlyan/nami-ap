import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/components/pages/login/Login')
}, {
  path: '/',
  component: () => import('@/components/common/baseWrapper/BaseWrapper'),
  children: [/*{
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/components/pages/dashboard/Dashboard')
  },*/ {
    path: '/users',
    name: 'users',
    component: () => import('@/components/pages/users/Users')
  }, {
    path: '/products',
    name: 'products',
    component: () => import('@/components/pages/products/Products')
  }, {
    path: '/orders',
    name: 'orders',
    component: () => import('@/components/pages/orders/Orders')
  }, {
    path: '/products/:productId',
    name: 'product',
    component: () => import('@/components/pages/productEditor/ProductEditor')
  }, {
    path: '/categories',
    name: 'categories',
    component: () => import('@/components/pages/categories/Categories')
  }, {
    path: '/news/:newId',
    name: 'new-editor',
    component: () => import('@/components/pages/news/components/NewEditor')
  }, {
    path: 'settings',
    name: 'settings',
    component: () => import('@/components/pages/settings/Settings')
  }]
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
