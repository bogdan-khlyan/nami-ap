<template>
  <div class="base-upload-image">
    <plus/>
  </div>
</template>

<script>
export default {
  name: 'base-upload-image',
}
</script>

<style lang="scss" scoped>
.base-upload-image {
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
</style>
