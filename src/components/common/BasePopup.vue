<template>
  <el-dialog
      class="base-popup"
      v-model="visible"
      :width="width"
      :before-close="close"
  >
    <template #header>
      <div class="base-popup__header">
        <div class="base-popup__header--icon">
          <el-icon size="18" color="#FFFFFF">
            <slot name="icon">
              <Menu/>
            </slot>
          </el-icon>
        </div>
        <div class="base-popup__header--title">{{ title }}</div>
      </div>
    </template>
    <div v-loading="loading" class="base-popup__content">
      <slot/>
      <div class="base-popup__footer">
        <el-button
            type="primary"
            @click="save"
        >{{ buttonText }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'base-popup',
  props: {
    title: { type: String },
    loading: { type: Boolean, default: false },
    width: { type: String, default: '30%' },
    buttonText: { type: String, default: 'Сохранить' }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    save() {
      this.$emit('save')
    },
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.base-popup {
  &__header {
    display: flex;
    gap: 12px;
    align-items: center;

    &--icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #07103A;
      border-radius: 6px;
    }

    &--title {
      font-family: 'Raleway', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      color: #07103A;
    }
  }
  &__footer {
    margin-top: 15px;
    //margin-left: auto;
    width: 100%;
    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
.el-dialog__body {
  padding-top: 10px;
}
</style>
