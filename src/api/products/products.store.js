import { defineStore } from 'pinia';

export default defineStore({
    id: 'products',
    state: () => ({
        products: []
    }),
    actions: {
        setProducts(products) {
            this.products = products
        },
        pushProduct(product) {
            this.products.push(product)
        },
        updateProduct(product) {
            const index = this.products.findIndex(item => item._id === product._id)
            this.products[index] = product
        }
    },
})
