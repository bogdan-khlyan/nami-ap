import useConfigStore from "@/api/config/config.store";

const configStore = useConfigStore()

export default {
    computed: {
        config() {
            return configStore.config
        }
    }
}
