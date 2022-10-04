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
            this.products = response.data.products
            return response.data.products
        },
        updateProduct(id, type, product) {
            if (type === 'SINGLE') {
                return this.updateSingleProduct(id, product)
            }
        },
        async updateSingleProduct(id, product) {
            const response = await axios.patch(`/api/admin/product/SINGLE/${id}`, product)
            const updated = response.data.product
            const index = this.products.findIndex(item => item._id === updated._id)
            this.products[index] = updated
        }
    },
})
