<template>
  <div class="base-upload-image">
    <div class="base-upload-image__content"
         @click="$refs.input.click()">
      <plus v-if="!modelValue"/>
      <img v-else
           :src="modelValue.link" alt="">
    </div>
    <input
        type="file"
        style="display: none"
        @change="handleChangeInput"
        ref="input"
    >
  </div>
</template>

<script>
export default {
  name: 'base-upload-image',
  props: {
    modelValue: { type: Object }
  },
  methods: {
    handleChangeInput($event) {
      const file = $event.target.files[0]
      this.$emit('update:modelValue', {
        link: window.URL.createObjectURL(file),
        file: file
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.base-upload-image {
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 56px;
    min-height: 56px;
    width: 56px;
    height: 56px;

    background: #FFFFFF;
    border: 1px solid #E5E8EF;
    border-radius: 8px;

    cursor: pointer;

    svg {
      width: 24px;
    }
  }
}
</style>
