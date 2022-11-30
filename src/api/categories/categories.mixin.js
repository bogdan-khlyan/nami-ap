import useCategoriesStore from "@/api/categories/categories.store";

const categoriesStore = useCategoriesStore()

export default {
    computed: {
        categories() {
            return categoriesStore.categories
        }
    }
}
