import {http} from "@/api/axios.config";
import useSettingsStore from "@/api/settings/settings.store";

export default () => ({
    store: useSettingsStore(),
    async getConfigApp() {
        try {
            const response = await http.get('/api/config')
            this.store.setSettings(response)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateConfigApp(config) {
        try {
            return await http.patch('/api/admin/config', config)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})
