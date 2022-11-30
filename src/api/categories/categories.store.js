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
        pushCategory(category) {
            this.categories.push(category)
        },
        deleteCategory(category) {
            const index = this.categories.findIndex(item => item._id === category._id)
            delete this.categories[index]
        },
        updateCategory(category) {
            const index = this.categories.findIndex(item => item._id === category._id)
            this.categories[index] = category
        }
    },
})
