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
        },
        async updateCategoriesProduct(productId, categories) {
            const promises = []
            this.categories.forEach(category => {
                if (!!category.productIds.find(item => item === productId)) { // продукт есть в этой категории
                    if (!categories.find(item => item === category._id)) { // категории нет в списке тех в которых должен быть этот продукт
                        promises.push(this.removeProductFromCategory(category._id, productId))
                    }
                } else {
                    if (categories.find(item => item === category._id)) {
                        promises.push(this.addProductToCategory(category._id, productId))
                    }
                }
            })
            return await Promise.all(promises)
        },
        addProductToCategory(categoryId, productId) {
            return axios.put(`/api/admin/product/${productId}/category/${categoryId}`)
        },
        removeProductFromCategory(categoryId, productId) {
            return axios.delete(`/api/admin/product/${productId}/category/${categoryId}`)
        },
        async updateCategory(category) {
            const response = await axios.patch(`/api/admin/product/category/${category._id}`, category)
            const index = this.categories.findIndex(item => item._id === category._id)
            this.categories[index] = response.data.category
        }
    },
})
