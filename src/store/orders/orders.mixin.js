import axios from "axios";
import usersMixin from "@/store/users/users.mixin";

export default {
    methods: {
        async getOrdersFull(page = 1, limit = 20, condition = null) {
            const response = await axios.get('/api/admin/orders', {
                params: {
                    page,
                    limit,
                    fCondition: condition,
                    sCreatedAt: 'asc'
                }
            })

            const promises = []
            promises.push(
                ...response.data.data
                    .map(order => this.getOrder(order.number))
            )
            const orders = await Promise.all(promises)

            promises.splice(0)
            promises.push(
                ...orders.map(order => usersMixin.methods.getUser(order.clientId))
            )
            const users = await Promise.all(promises)

            return {
                ...response.data,
                data: orders.map(order => ({
                    ...order,
                    user: users.find(user => user._id === order.clientId)
                }))
            }
        },
        async changeOrderCondition(orderNumber, condition) {
            const response = await axios.patch(`/api/admin/order/${orderNumber}/condition`, {
                condition
            })
        },
        async getOrder(number) {
            const response = await axios.get(`/api/admin/order/${number}`)
            return response.data.order
        }
    }
}
