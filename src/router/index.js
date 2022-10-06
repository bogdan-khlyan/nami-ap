import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/components/pages/login/Login')
}, {
  path: '/',
  component: () => import('@/components/common/baseWrapper/BaseWrapper'),
  children: [{
    path: '/products',
    name: 'products',
    component: () => import('@/components/pages/products/Products')
  }, {
    path: '/products/:productId',
    name: 'product',
    component: () => import('@/components/pages/productEditor/ProductEditor')
  }, {
    path: '/icons',
    name: 'icons',
    component: () => import('@/components/pages/icons/Icons')
  }]
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
