import {http} from "@/api/axios.config";

export default () => ({
    async getOrders(pagination) {
        try {
            let params = {...pagination}
            delete params.total

            return await http.get('/api/admin/orders', {params: params})
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async changeStatusOrder(order) {
        try {
            return await http.patch(`/api/admin/order/${order.number}/condition`, {condition: order.condition})
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async getOrdersByPhone(phone) {
        try {
            return await http.get(`/api/admin/order/${phone}`)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})
