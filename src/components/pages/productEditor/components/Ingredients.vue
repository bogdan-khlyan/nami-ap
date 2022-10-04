<template>
  <div class="ingredients">
    <div class="ingredients__item"
         v-for="(item, index) in modelValue">
      <el-input v-model="modelValue[index]" placeholder="Наименование" />
      <el-button
          type="danger" icon="delete"
          @click="deleteItem(index)"
      />
    </div>
    <el-button
        type="primary" icon="plus"
        @click="modelValue.push('')"
    >Добавить</el-button>
  </div>
</template>

<script>
export default {
  name: 'ingredients',
  props: {
    modelValue: { type: Array }
  },
  methods: {
    deleteItem(index) {
      this.modelValue.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.ingredients {
  &__item {
    display: flex;
    margin-top: 2px;
    margin-bottom: 2px;
    :deep(.el-button) {
      margin-left: 5px;
    }
  }
  :deep(> .el-button) {
    width: 100%;
  }
}
</style>
