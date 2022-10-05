<template>
  <el-popover
      placement="bottom"
      :width="400"
      trigger="click"
  >
    <template #reference>
      <div class="base-select-icon__item" style="margin: 0">
        <plus v-if="!modelValue"/>
        <img v-else
             :src="`/api/product/variant/icon/${modelValue}`" alt="">
      </div>
    </template>
    <div class="base-select-icon">
      <div
          class="base-select-icon__item"
          v-for="item of icons" :key="item.link"
          :class="{ active: modelValue === item.filename }"
          @click="handleSelectIcon(item)"
      >
        <img :src="item.link" alt="">
      </div>
    </div>
  </el-popover>
</template>

<script>
import iconsMixin from "@/store/icons/icons.mixin";

export default {
  name: 'base-select-icon',
  mixins: [iconsMixin],
  props: {
    modelValue: { type: String }
  },
  methods: {
    handleSelectIcon(icon) {
      this.$emit('update:modelValue', icon.filename)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-select-icon {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 4px;
    margin-bottom: 4px;

    min-width: 56px;
    min-height: 56px;
    width: 56px;
    height: 56px;

    background: #FFFFFF;
    border: 1px solid #E5E8EF;
    border-radius: 8px;

    cursor: pointer;
    &.active {
      border-color: #409eff;
    }
    svg {
      width: 24px;
    }
  }
}
</style>
