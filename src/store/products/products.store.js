import { defineStore } from 'pinia'
import axios from "axios";

export default defineStore({
    id: 'products',
    state: () => ({
        products: []
    }),
    actions: {
        async getProducts() {
            const response = await axios.get('/api/admin/products')
            this.products = response.data.products.map(item => ({
                ...item,
                images: item.images.map(image => `/api/product/image/${image}`)
            }))
            return this.products
        },
        createProduct(type, product) {
            if (type === 'SINGLE') {
                return this.createSingleProduct(product)
            } else {
                return this.createVariantProduct(product)
            }
        },
        async createVariantProduct(product) {
            const response = await axios.post(`/api/admin/product/VARIANT`, product)
            return response.data.product
        },
        async createVariantForProduct(productId, variant) {
            const response = await axios.post(`/api/admin/product/VARIANT/${productId}/variant`, variant)
            return response.data.variant
        },
        async createSingleProduct(product) {
            const response = await axios.post(`/api/admin/product/SINGLE`, product)
            return response.data.product
        },
        updateProduct(id, type, product) {
            if (type === 'SINGLE') {
                return this.updateSingleProduct(id, product)
            } else {
                return this.updateVariantProduct(id, product)
            }
        },
        async updateSingleProduct(id, product) {
            const response = await axios.patch(`/api/admin/product/SINGLE/${id}`, product)
            const updated = response.data.product
            const index = this.products.findIndex(item => item._id === updated._id)
            this.products[index] = updated
        },
        async updateVariantProduct(id, product) {
            const response = await axios.patch(`/api/admin/product/VARIANT/${id}`, product)
            return response.data.product
        }
    },
})
