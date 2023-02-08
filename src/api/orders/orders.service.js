import {http} from "@/api/axios.config";

export default () => ({
    async getOrders(limit = 10, page = 1, condition, phone, name) {
        try {
            const query = {
                limit,
                page,
                fCondition: condition ? condition : null,
                mPhone: phone ? phone : null,
                mUsername: name ? name : null
            }
            return await http.get('/api/admin/orders', { params: query })
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
    async getOrder(number) {
        try {
            const { order } = await http.get(`/api/admin/order/${number}`)
            return order
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})
