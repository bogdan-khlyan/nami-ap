import useIconsStore from "@/api/icons/icons.store";
import {http} from "@/api/axios.config";

export default () => ({
    store: useIconsStore(),
    async getIcons() {
        try {
            const { filenames } = await http.get('/api/admin/product/variant/icons')
            const result = filenames.map(filename => ({
                filename: filename,
                link: `/api/product/variant/icon/${filename}`
            }))
            this.store.setIcons(result)
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async uploadIcon(file) {
        try {
            const formData = new FormData()
            formData.append('icon', file)
            const response = await http.post('/api/admin/product/variant/icon', formData)
            const filename = response.data.filename
            this.store.pushIcon({
                filename: filename,
                link: `/api/product/variant/icon/${filename}`
            })
        } catch (error) {
            console.log(error)
        }
    },
    async deleteIcon(filename) {
        try {
            await http.delete(`/api/admin/product/variant/icon/${filename}`)
            this.store.removeIcon(filename)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})