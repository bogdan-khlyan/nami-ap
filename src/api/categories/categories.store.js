import { defineStore } from 'pinia'

export default defineStore({
    id: 'categories',
    state: () => ({
        categories: []
    }),
    actions: {
        setCategories(categories) {
            this.categories = categories
        },
        updateCategory(category) {
            const index = this.categories.findIndex(item => item._id === category._id)
            this.categories[index] = category
        }
    },
})
