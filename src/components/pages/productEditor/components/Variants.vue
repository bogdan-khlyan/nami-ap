<template>
  <div class="variants">
    <div class="variants__item"
         v-for="(item, index) in modelValue">
      <base-upload-image v-model="modelValue[index].image"/>
      <el-input v-model="modelValue[index].title" placeholder="Please input" />
    </div>
    <el-button
        type="primary" icon="plus"
        @click="modelValue.push({})"
    >Добавить</el-button>
  </div>
</template>

<script>
import BaseUploadImage from "@/components/common/BaseUploadImage";

export default {
  name: 'variants',
  components: { BaseUploadImage },
  props: {
    modelValue: { type: Array }
  },
}
</script>

<style lang="scss" scoped>
.variants {
  :deep(> .el-button) {
    width: 260px;
  }
  &__item {
    display: flex;
  }
}
</style>
