import { defineStore } from 'pinia';

export default defineStore({
    id: 'settings',
    state: () => ({
        settings: null
    }),
    actions: {
        setSettings(settings) {
            this.settings = settings
        },
    },
})
