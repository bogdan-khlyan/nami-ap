import { defineStore } from 'pinia'
import axios from "axios";

export default defineStore({
    id: 'icons',
    state: () => ({
        icons: []
    }),
    actions: {
        async getIcons() {
            const response = await axios.get('/api/admin/product/variant/icons')
            this.icons = response.data.filenames
        },
        async uploadIcon(file) {
            const formData = new FormData()
            formData.append('icon', file)
            const response = await axios.post('/api/admin/product/variant/icon', formData)
        }
    },
})
