import useCategoriesStore from "@/store/categories/categories.store";

const categoriesStore = useCategoriesStore()

export default {
    computed: {
        categories() {
            return categoriesStore.categories
        }
    },
    methods: {
        getCategories() {
            return categoriesStore.getCategories()
        },
        updateCategoriesProduct(productId, categories) {
            return categoriesStore.updateCategoriesProduct(productId, categories)
        }
    }
}
