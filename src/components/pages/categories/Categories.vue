<template>
  <div class="categories">
    <div class="categories__header">
      <el-button
          class="categories__header--btn"
          type="primary" icon="plus"
      >Создать категорию</el-button>
    </div>
    <div class="categories__table">
      <el-table
          :data="categories"
          style="width: 100%"
      >
        <el-table-column
            property="title"
            label="Наименование"
            width="auto"
        />
        <el-table-column
            width="200"
        >
          <template #default="scope">
            <el-switch
                :model-value="scope.row.visible"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :loading="loading === scope.row._id"
                @change="updateCategoryVisible(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column width="80">
          <template #default="scope">
            <el-button
                type="primary" icon="edit"
                :loading="loading === scope.row._id"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import categoriesMixin from "@/store/categories/categories.mixin";

export default {
  name: 'categories',
  mixins: [categoriesMixin],
  data() {
    return {
      loading: null
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    updateCategoryVisible(category) {
      this.loading = category._id
      this.updateCategory({
        _id: category._id,
        visible: !category.visible
      }).finally(() => this.loading = null)
    }
  }
}
</script>

<style lang="scss" scoped>
.categories {
  padding: 10px;
  &__header {
    width: 100%;
    &--btn {
      display: block;
      margin-left: auto;
    }
  }
  &__table {
    width: 100%;
  }
}
</style>
