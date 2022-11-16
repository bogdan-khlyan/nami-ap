<template>
  <div class="order__pagination">
    <el-pagination
        layout="prev, pager, next"
        background
        :total="pagination.total"
        :page-size="10"
        @current-change="changePage"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagination: {type: Object}
  },
  methods: {
    changePage(event) {
      this.$emit('changePagination', {...this.pagination, page: event})
    }
  }
}
</script>

<style scoped lang="scss"></style>