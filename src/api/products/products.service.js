import {http} from "@/api/axios.config";
import useProductsStore from "@/api/products/products.store";

export default () => ({
    store: useProductsStore(),
    async getProducts() {
        try {
            const { products } = await http.get('/api/admin/products')
            const result = products.map(item => ({
                ...item,
                images: item.images.map(image => ({
                    filename: image,
                    link: `/api/product/image/${image}`
                }))
            }))
            this.store.setProducts(result)
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    createProduct(type, product) {
        if (type === 'SINGLE') {
            return this.createSingleProduct(product)
        } else {
            return this.createVariantProduct(product)
        }
    },
    async createSingleProduct(requestData) {
        try {
            const { product } = await http.post(`/api/admin/product/SINGLE`, requestData)
            this.store.pushProduct(product)
            return product
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async createVariantProduct(requestData) {
        try {
            const { product } = await http.post(`/api/admin/product/VARIANT`, requestData)
            this.store.pushProduct(product)
            return product
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async createVariantForProduct(productId, requestData) {
        try {
            const image = requestData.image
            delete requestData.image
            const { variant } = await http.post(`/api/admin/product/VARIANT/${productId}/variant`, requestData)
            if (image) {
                await this.putImageForVariant(variant._id, image)
            }
            return variant
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async putImageForVariant(variantId, image) {
        try {
            const formData = new FormData()
            formData.append('image', image)
            const data = await http.put(`/api/admin/product/variant/${variantId}`, formData)
            console.log(data)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateVariantForProduct(productId, variantId, requestData) {
        try {
            const image = requestData.image
            delete requestData.image
            const { variant } = await http.patch(`/api/admin/product/VARIANT/${productId}/variant/${variantId}`, requestData)
            if (image) {
                await this.putImageForVariant(variant._id, image)
            }
            return variant
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    updateProduct(id, type, product) {
        if (type === 'SINGLE') {
            return this.updateSingleProduct(id, product)
        } else {
            return this.updateVariantProduct(id, product)
        }
    },
    async updateSingleProduct(id, requestData) {
        try {
            const { product } = await http.patch(`/api/admin/product/SINGLE/${id}`, requestData)
            this.store.updateProduct(product)
            return product
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async putImagesForSingleProduct(productId, files) {
        try {
            const formData = new FormData()
            Array.from(files).forEach(file => {
                formData.append('images', file)
            })
            const data = await http.put(`/api/admin/product/${productId}/images`, formData)
            console.log(data)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async deleteImageFromProduct(productId, filename) {
        try {
            const data = await http.delete(`/api/admin/product/${productId}/image/${filename}`)
            console.log(data)
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateVariantProduct(id, requestData) {
        try {
            const { product } = await http.patch(`/api/admin/product/VARIANT/${id}`, requestData)
            return product
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})
