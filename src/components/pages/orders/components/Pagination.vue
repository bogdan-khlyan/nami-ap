<template>
  <div class="order__pagination">
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
  name: "Pagination",
  props: {
    pagination: {type: Object}
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

<style lang="scss">
.el-pager li.is-active {
  color: #FFFFFF;
  background: #1857F3;
  border-radius: 50px;
}
</style>