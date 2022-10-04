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
        }
    }
}
