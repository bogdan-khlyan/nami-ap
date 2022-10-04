<template>
  <div class="base-upload-images">
    <div class="base-upload-images__image"
         v-for="image in modelValue" :key="image.link">
      <button class="base-upload-images__image--delete"
              @click="$emit('delete', image)">
        <close-bold/>
      </button>
      <img :src="image.link" alt="">
    </div>
    <div class="base-upload-images__btn"
         @click="clickPlus">
      <plus/>
    </div>
    <input
        type="file"
        style="display: none"
        multiple
        @change="changeInput"
        ref="input"
    >
  </div>
</template>

<script>
export default {
  name: 'base-upload-images',
  props: {
    modelValue: [],
    onlyEmit: { type: Boolean, default: false }
  },
  methods: {
    clickPlus() {
      this.$refs.input.click()
    },
    changeInput($event) {
      if (this.onlyEmit) {
        this.$emit('input', $event.target.files)
        return
      }
      for (const file of $event.target.files) {
        this.modelValue.push({
          link: window.URL.createObjectURL(file),
          file: file
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-upload-images {
  display: flex;
  &__image {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 5px;
    margin-right: 5px;

    width: 100px;
    height: 100px;

    background: #FFFFFF;
    border: 1px solid #E5E8EF;
    border-radius: 8px;
    &:hover {
      .base-upload-images__image--delete {
        opacity: 1;
      }
    }
    &:first-child {
      margin-left: 0;
    }

    > img {
      width: 90px;
      height: 90px;
      object-fit: cover;
    }

    &--delete {
      position: absolute;
      top: 4px;
      right: 4px;

      width: 24px;
      height: 24px;
      border: none;
      border-radius: 4px;
      background-color: #FF5858;
      cursor: pointer;
      opacity: 0;
      transition-duration: 600ms;
      &:hover {
        background-color: #F90D0D;
      }
      > svg {
        color: #FFFFFF;
      }
    }

  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;
    height: 100px;

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
