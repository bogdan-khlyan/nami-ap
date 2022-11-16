import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/index.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ru from 'element-plus/es/locale/lang/ru'

import {createPinia} from 'pinia'
const pinia = createPinia()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
   .use(pinia)
   .use(ElementPlus, { locale: ru })
   .mount('#app')


import productsService from "@/api/products/products.service";
import categoriesService from "@/api/categories/categories.service";
import iconsService from "@/api/icons/icons.service";
import usersService from "@/api/users/users.service";
app.config.globalProperties.$products = productsService()
app.config.globalProperties.$categories = categoriesService()
app.config.globalProperties.$icons = iconsService()
app.config.globalProperties.$users = usersService()
