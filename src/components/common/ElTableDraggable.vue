<template>
  <div :id="id"
       class="el-table-draggable">
    <base-table :data="data">
      <el-table-column
          v-if="!disabled"
          width="50px"
          class-name="el-table-draggable__icon"
      >
        <el-icon :size="20"><rank/></el-icon>
      </el-table-column>
      <slot/>
    </base-table>
  </div>
</template>

<script>
import BaseTable from "@/components/common/BaseTable";
import Sortable from "sortablejs";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'el-table-draggable',
  components: { BaseTable },
  props: {
    data: { type: Array },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      id: `id${uuidv4()}`,
      sortable: null
    }
  },
  watch: {
    disabled() {
      this.changeDisabled()
    }
  },
  mounted() {
    this.rowDrop()
    this.changeDisabled()
  },
  methods: {
    changeDisabled() {
      this.sortable.option('disabled', this.disabled)
    },
    rowDrop() {
      const tbody = document.querySelector(`#${this.id} .el-table__body-wrapper tbody`)
      this.sortable = Sortable.create(tbody, {
        draggable: `#${this.id} .el-table__row`,
        animation: 150,
        onEnd: ($event) => this.$emit('drop-el', $event)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-table-draggable__icon) {
  cursor: move;
}
</style>
