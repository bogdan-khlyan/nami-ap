import axios from "axios";

export default {
    methods: {
        async getUsers(page, limit = 20) {
            const response = await axios.get('/api/admin/users', {
                params: {
                    page: page,
                    limit: limit
                }
            })
            return response.data
        },
        async getUser(id) {
            const response = await axios.get(`/api/admin/user/${id}`)
            return response.data.user
        }
    }
}
