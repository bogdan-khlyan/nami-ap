<template>
  <div class="icons">
    <base-upload-images
        v-model="icons"
        only-emit
        @input="handleInputIcons"
        @delete="handleDeleteIcon"
    />
  </div>
</template>

<script>
import BaseUploadImages from "@/components/common/BaseUploadImages";
import iconsMixin from "@/api/icons/icons.mixin";

export default {
  name: 'icons',
  mixins: [iconsMixin],
  components: { BaseUploadImages },
  async created() {
    await this.$icons.getIcons()
  },
  methods: {
    async handleInputIcons(files) {
      const promises = []
      Array.from(files).forEach(file => {
        promises.push(this.$icons.uploadIcon(file))
      })
      await Promise.all(promises)
    },
    handleDeleteIcon(icon) {
      this.$icons.deleteIcon(icon.filename)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons {
  padding: 10px;
}
</style>
