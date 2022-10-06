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
                images: item.images.map(image => ({
                    filename: image,
                    link: `/api/product/image/${image}`
                }))
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
            const image = variant.image
            delete variant.image
            const response = await axios.post(`/api/admin/product/VARIANT/${productId}/variant`, variant)
            if (image) {
                await this.putImageForVariant(response.data.variant._id, image)
            }
            return response.data.variant
        },
        async updateVariantForProduct(productId, variantId, variant) {
            console.log(variant)
            const image = variant.image
            delete variant.image
            const response = await axios.patch(`/api/admin/product/VARIANT/${productId}/variant/${variantId}`, variant)
            if (image) {
                await this.putImageForVariant(response.data.variant._id, image)
            }
            return response.data.variant
        },
        async putImageForVariant(variantId, image) {
            const formData = new FormData()
            formData.append('image', image)
            const response = await axios.put(`/api/admin/product/variant/${variantId}`, formData)
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
        async putImagesForSingleProduct(productId, files) {
            const formData = new FormData()
            Array.from(files).forEach(file => {
                formData.append('images', file)
            })
            const response = await axios.put(`/api/admin/product/${productId}/images`, formData)
        },
        async deleteImageFromProduct(productId, filename) {
            const response = await axios.delete(`/api/admin/product/${productId}/image/${filename}`)
        },
        async updateVariantProduct(id, product) {
            const response = await axios.patch(`/api/admin/product/VARIANT/${id}`, product)
            return response.data.product
        }
    },
})
