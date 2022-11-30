import useIconsStore from "@/api/icons/icons.store";

const iconsStore = useIconsStore()

export default {
    computed: {
        icons() {
            return iconsStore.icons
        }
    }
}
