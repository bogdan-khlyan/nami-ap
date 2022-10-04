<template>
  <div class="icons">
    {{ icons }}
    <input type="file" @change="upload">
  </div>
</template>

<script>
import iconsMixin from "@/store/icons/icons.mixin";

export default {
  name: 'icons',
  mixins: [iconsMixin],
  created() {
    this.getIcons()
  },
  methods: {
    upload($event) {
      this.uploadIcon($event.target.files[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.icons {

}
</style>
