<template>
  <div class="base-pagination">
    <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        layout="prev, pager, next, sizes, total"
        @size-change="changePage"
        @current-change="changePage"
        :total="pagination.total"
    />
  </div>
</template>

<script>
export default {
  name: "base-pagination",
  props: {
    pagination: { type: Object }
  },
  data() {
    return {
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    changePage() {
      this.$emit('changePagination', {...this.pagination, page: this.page, limit: this.pageSize})
    },
  }
}
</script>

<style scoped lang="scss">
.base-pagination {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  :deep(.el-pager li.is-active) {
    border-radius: 50px;
    background: #1857F3;
    color: #FFFFFF;
  }
}
</style>