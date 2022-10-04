<template>
  <component
      :is="tag"
      class="base-label"
      :class="[type, { error: isError }]"
      ref="root">
    <span class="label">{{ label }}</span>
    <span class="base-label__content">
      <slot/>
      <el-collapse-transition>
        <span v-if="isError && errorMessage" class="base-label__error-message">{{errorMessage}}</span>
      </el-collapse-transition>
    </span>
  </component>
</template>

<script>
import {messagesMap} from "@/utils/validation";

export default {
  name: 'base-input',
  props: {
    type: { type: String, default: null },
    label: { type: String, default: null },
    validator: { type: Object },
    tag: { type: String, default: 'label' }
  },
  computed: {
    isError() {
      return this.validator?.$error
    },
    errorMessage() {
      if (this.validator) {
        const keys = Object.keys(this.validator)
            .filter(key => key[0] !== '$')
        for (let key of keys) {
          if (this.validator?.[key].$invalid && messagesMap.get(key)) {
            return messagesMap.get(key)(this.validator[key])
          }
        }
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.base-label {
  display: block;
  margin-top: 2px;
  margin-bottom: 2px;
  .label {
    font-size: 14px;
  }
  &.flex {
    display: flex;
    align-items: center;
    .label {
      display: block;
      min-width: max-content;
      padding-right: 30px;
    }
    > span {
      width: 100%;
    }
  }
  &.error {
    :deep(.el-input__wrapper), :deep(.el-textarea) {
      box-shadow: 0 0 0 1px red!important;
      border-radius: 4px;
    }
  }
  &__error-message {
    display: block;
    margin-top: -3px;
    font-size: 13px;
    color: red;
  }
  &__content {
    display: block;
    min-height: 52px;
  }
}
</style>
