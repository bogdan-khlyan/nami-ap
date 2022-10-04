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
import iconsMixin from "@/store/icons/icons.mixin";
import BaseUploadImages from "@/components/common/BaseUploadImages";

export default {
  name: 'icons',
  mixins: [iconsMixin],
  components: { BaseUploadImages },
  async created() {
    await this.getIcons()
  },
  methods: {
    async handleInputIcons(files) {
      const promises = []
      Array.from(files).forEach(file => {
        promises.push(this.uploadIcon(file))
      })
      await Promise.all(promises)
    },
    handleDeleteIcon(icon) {
      this.deleteIcon(icon.filename)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons {
  padding: 10px;
}
</style>
