<template>
  <label class="base-label" :class="[type, { error: isError }]" ref="root">
    <span class="label">{{ label }}</span>
    <span class="base-label__content">
      <slot/>
      <el-collapse-transition>
        <span v-if="isError && errorMessage" class="base-label__error-message">{{errorMessage}}</span>
      </el-collapse-transition>
    </span>
  </label>
</template>

<script>
import {messagesMap} from "@/utils/validation";

export default {
  name: 'base-input',
  props: {
    type: { type: String, default: null },
    label: { type: String, default: null },
    validator: { type: Object }
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
  margin-top: 5px;
  margin-bottom: 5px;
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
    :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 1px red!important;
    }
  }
  &__error-message {
    display: block;
    margin-top: -3px;
    font-size: 14px;
    color: red;
  }
  &__content {
    display: block;
    min-height: 52px;
  }
}
</style>
