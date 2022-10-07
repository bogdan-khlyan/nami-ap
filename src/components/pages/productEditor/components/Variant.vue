<template>
  <div class="variant">
    <base-upload-image
        v-model="modelValue.image"
    />
    <base-label
        :validator="v$.modelValue.title"
        no-message
        style="margin-left: 4px;margin-right: 4px"
    >
      <el-input
          v-model="modelValue.title"
          placeholder="Наименование"
      />
    </base-label>
    <base-select-icon
        v-model="modelValue.icon"
        no-message
    />
    <base-label
        :validator="v$.modelValue.cost"
        no-message
        style="margin-left: 4px;margin-right: 4px"
    >
      <el-input-number
          v-model="modelValue.cost"
          :min="0"
          :max="100000"
          placeholder="Цена"
      />
    </base-label>
    <base-label
        :validator="v$.modelValue.weight"
        no-message
    >
      <el-input-number
          v-model="modelValue.weight"
          :min="0"
          :max="100000"
          placeholder="Вес"
      />
    </base-label>
    <el-switch
        v-model="modelValue.visible"
        inline-prompt
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;margin-left: 5px"
    />
  </div>
</template>

<script>
import BaseUploadImage from "@/components/common/BaseUploadImage";
import BaseSelectIcon from "@/components/common/BaseSelectIcon";
import BaseLabel from "@/components/common/BaseLabel";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {minLength, required} from "@vuelidate/validators";

export default {
  name: 'variants',
  components: { BaseUploadImage, BaseSelectIcon, BaseLabel },
  setup () {
    return { v$: useVuelidate() }
  },
  props: {
    modelValue: { type: Object }
  },
  methods: {
    validate() {
      this.v$.$touch()
      return !this.v$.$error
    }
  },
  validations() {
    return {
      modelValue: {
        title: {
          required,
          minLength: minLength(3)
        },
        cost: { required },
        weight: { required }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.variant {
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  :deep(.base-label) {
    margin: 0;
    .el-input {
      height: 56px;
    }
  }
}
</style>
