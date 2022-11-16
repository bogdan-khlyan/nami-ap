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
app.config.globalProperties.$products = productsService()
