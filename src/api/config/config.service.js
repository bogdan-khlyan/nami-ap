import {http} from "@/api/axios.config";
import useConfigStore from "@/api/config/config.store";
import {ElMessage} from "element-plus";

export default () => ({
    store: useConfigStore(),
    async getConfig() {
        try {
            const { config } = await http.get('/api/config')
            this.store.setConfig(config)
            return config
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateConfig(requestData) {
        try {
            const { config } = await http.patch('/api/admin/config', requestData)
            ElMessage.success({ message: 'Настройки обновлены' })
            return config
        } catch (error) {
            console.log(error)
            throw error
        }
    }
})
