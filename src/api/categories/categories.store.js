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
            this.categories = this.categories.filter(item => item._id !== category._id)
        },
        updateCategory(category) {
            const index = this.categories.findIndex(item => item._id === category._id)
            this.categories[index] = category
        }
    },
})
