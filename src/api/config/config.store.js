import { defineStore } from 'pinia';

export default defineStore({
    id: 'config',
    state: () => ({
        config: null
    }),
    actions: {
        setConfig(config) {
            this.config = config
        },
    },
})
