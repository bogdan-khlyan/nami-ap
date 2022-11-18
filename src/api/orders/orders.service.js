import {http} from "@/api/axios.config";

export default () => ({
    async getOrders(pagination) {
        try {
            let params = {...pagination}
            delete params.total

            let {data, page, total} = await http.get('/api/admin/orders', {params: params})

            let promises = []
            data.forEach((item) => {
                promises.push(this.getOrdersByPhone(item.number))
            })

            return Promise.all(promises).then(values => {
                const data = values.map((item) => {
                    return item.order
                })
                return {data, page, total}
            })
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
