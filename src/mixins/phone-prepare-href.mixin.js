export default {
    methods: {
        preparePhone(phone) {
            return `tel:${
                phone
                    .replaceAll('(', '')
                    .replaceAll(')', '')
                    .replaceAll('-', '')
            }`
        }
    }
}