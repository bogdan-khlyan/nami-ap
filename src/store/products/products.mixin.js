import useProductsStore from "@/store/products/products.store";

const productsStore = useProductsStore()

export default {
    computed: {
        products() {
            return productsStore.products
        }
    },
    methods: {
        getProducts() {
            return productsStore.getProducts()
        },
        updateProduct(id, type, product) {
            return productsStore.updateProduct(id, type, product)
        },
        createProduct(type, product) {
            return productsStore.createProduct(type, product)
        },
        createVariantForProduct(productId, variant) {
            return productsStore.createVariantForProduct(productId, variant)
        },
        updateVariantForProduct(productId, variantId, variant) {
            return productsStore.updateVariantForProduct(productId, variantId, variant)
        },
        putImagesForSingleProduct(productId, files) {
            return productsStore.putImagesForSingleProduct(productId, files)
        },
        deleteImageFromProduct(productId, filename) {
            return productsStore.deleteImageFromProduct(productId, filename)
        }
    }
}
