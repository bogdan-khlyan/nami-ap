import productsService from "@/api/products/products.service";
import categoriesService from "@/api/categories/categories.service";
import iconsService from "@/api/icons/icons.service";
import usersService from "@/api/users/users.service";

export function useApi(app) {
    app.config.globalProperties.$products = productsService()
    app.config.globalProperties.$categories = categoriesService()
    app.config.globalProperties.$icons = iconsService()
    app.config.globalProperties.$users = usersService()
}