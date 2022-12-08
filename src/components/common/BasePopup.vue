<template>
  <el-dialog
      class="base-popup"
      v-model="visible"
      :title="title"
      width="30%"
      :before-close="close"
  >
    <div v-loading="loading" class="base-popup__content">
      <slot/>
      <div class="base-popup__footer">
        <el-button
            @click="close"
        >Отмена</el-button>
        <el-button
            type="primary"
            @click="save"
        >Ок</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'base-popup',
  props: {
    title: { type: String },
    loading: { type: Boolean, default: false }
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
  &__footer {
    margin-top: 15px;
    margin-left: auto;
    width: max-content;
  }
}
</style>

<style lang="scss">
.el-dialog__body {
  padding-top: 10px;
}
</style>
