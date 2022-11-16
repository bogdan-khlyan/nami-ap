import { defineStore } from 'pinia'
import axios from "axios";

export default defineStore({
    id: 'icons',
    state: () => ({
        icons: []
    }),
    actions: {
        setIcons(icons) {
            this.icons = icons
        },
        pushIcon(icon) {
            this.icons.push(icon)
        },
        removeIcon(filename) {
            const index = this.icons.findIndex(item => item.filename === filename)
            if (index !== -1) {
                this.icons.splice(index, 1)
            }
        }
    },
})
