<template>
  <div class="base-upload-images">
    <div class="base-upload-images__image"
         v-for="image in modelValue" :key="image.link">
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
    modelValue: []
  },
  methods: {
    clickPlus() {
      this.$refs.input.click()
    },
    changeInput($event) {
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
    &:first-child {
      margin-left: 0;
    }

    > img {
      width: 90px;
      height: 90px;
      object-fit: cover;
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
