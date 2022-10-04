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
            this.icons = response.data.filenames.map(filename => ({
                filename: filename,
                link: `/api/product/variant/icon/${filename}`
            }))
        },
        async uploadIcon(file) {
            const formData = new FormData()
            formData.append('icon', file)
            const response = await axios.post('/api/admin/product/variant/icon', formData)
            const filename = response.data.filename
            this.icons.push({
                filename: filename,
                link: `/api/product/variant/icon/${filename}`
            })
        },
        async deleteIcon(filename) {
            await axios.delete(`/api/admin/product/variant/icon/${filename}`)
            const index = this.icons.findIndex(item => item.filename === filename)
            if (index !== -1) {
                this.icons.splice(index, 1)
            }
        }
    },
})
