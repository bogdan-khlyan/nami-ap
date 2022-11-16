import {http} from "@/api/axios.config";
import useCategoriesStore from "@/api/categories/categories.store";

export default () => ({
    store: useCategoriesStore(),
    async getCategories() {
        try {
            const { categories } = await http.get('/api/admin/product/categories')
            this.store.setCategories(categories)
            return categories
        } catch (error) {
            console.log(error)
            throw error
        }
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
        return http.put(`/api/admin/product/${productId}/category/${categoryId}`)
    },
    removeProductFromCategory(categoryId, productId) {
        return http.delete(`/api/admin/product/${productId}/category/${categoryId}`)
    },
    async updateCategory(requestData) {
        const { category } = await http.patch(`/api/admin/product/category/${requestData._id}`, requestData)
        this.store.updateCategory(category)
        return category
    }
})