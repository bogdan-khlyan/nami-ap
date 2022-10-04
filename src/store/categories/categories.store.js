import { defineStore } from 'pinia'
import axios from "axios";

export default defineStore({
    id: 'categories',
    state: () => ({
        categories: []
    }),
    actions: {
        async getCategories() {
            const response = await axios.get('/api/admin/product/categories')
            this.categories = response.data.categories
        }
    },
})
