<template>
  <div class="ingredients">
    <div class="ingredients__item"
         v-for="(item, index) in modelValue"
         :ref="`ingredient${index}`">
      <el-input
          v-model="modelValue[index]"
          placeholder="Наименование"
          @input="validateItem(index)"
      />
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
  data() {
    return {
      touch: false
    }
  },
  methods: {
    validate() {
      this.touch = true
      let valid = true
      for (let i in this.modelValue) {
        if (!this.validateItem(i)) {
          valid = false
        }
      }
      return valid
    },
    validateItem(index) {
      if (!this.touch) {
        return
      }
      if (!this.modelValue[index] || this.modelValue[index].length < 3 || this.modelValue[index].length > 32) {
        this.$refs[`ingredient${index}`][0].classList.add('error')
        return false
      } else {
        this.$refs[`ingredient${index}`][0].classList.remove('error')
        return true
      }
    },
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
    margin-top: 4px;
    margin-bottom: 4px;
    &.error {
      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px red!important;
      }
    }
    :deep(.el-button) {
      margin-left: 5px;
    }
  }
  :deep(> .el-button) {
    width: 100%;
  }
}
</style>
