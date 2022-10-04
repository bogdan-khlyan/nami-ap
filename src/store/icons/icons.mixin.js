import useIconsStore from "@/store/icons/icons.store";

const iconsStore = useIconsStore()

export default {
    computed: {
        icons() {
            return iconsStore.icons
        }
    },
    methods: {
        getIcons() {
            return iconsStore.getIcons()
        },
        uploadIcon(file) {
            return iconsStore.uploadIcon(file)
        }
    }
}
