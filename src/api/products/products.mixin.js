import useProductsStore from "@/api/products/products.store";

const productsStore = useProductsStore()

export default {
    computed: {
        products() {
            return productsStore.products
        }
    }
}
