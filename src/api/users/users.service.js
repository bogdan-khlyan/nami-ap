import {http} from "@/api/axios.config";

export default () => ({
    async getUsers(page, limit = 20) {
        try {
            return await http.get('/api/admin/users', {
                params: {
                    page: page,
                    limit: limit
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async getUser(id) {
        try {
            const { user } = await http.get(`/api/admin/user/${id}`)
            return user
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})
