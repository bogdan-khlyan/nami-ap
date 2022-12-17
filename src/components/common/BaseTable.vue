<template>
  <div class="base-table">
    <el-table
        :data="data"
        @selection-change="$emit('selection-change', $event)"
    >
      <slot/>
    </el-table>
    <div v-loading="true"
         class="base-table__loading"/>
  </div>
</template>

<script>
export default {
  name: 'base-table',
  props: {
    data: { type: Array }
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  &__loading {
    display: none;
    width: 100%;
    height: calc(100vh - 56px);
  }
}
</style>
