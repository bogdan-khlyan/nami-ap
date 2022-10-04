<template>
  <div class="products">
    <div class="products__header">
      <el-input
          v-model="filters.title"
          placeholder="Фильтр по наименованию"
          clearable
      />
      <el-select
          v-model="filters.category"
          placeholder="Фильтр по категории" size="large"
          clearable
      >
        <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.title"
            :value="item._id"
        />
      </el-select>
    </div>
    <div class="products__table">
      <el-table
          :data="productsFiltered"
          style="width: 100%"
      >
        <el-table-column
            property="title"
            label="Наименование"
            width="auto"
        />
        <el-table-column
            property="visible"
            label="Статус"
            width="auto"
        >
          <template #default="scope">
            <el-switch
                v-model="scope.row.visible"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :disabled="loading === scope.row._id"
                @change="updateProductStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column width="220">
          <template #default="scope">
            <el-button
                type="primary" icon="edit"
                :loading="loading === scope.row._id"
                @click="$router.push(`/products/${scope.row._id}`)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import categoriesMixin from "@/store/categories/categories.mixin";
import productsMixin from "@/store/products/products.mixin";

export default {
  name: 'products',
  mixins: [categoriesMixin, productsMixin],
  data() {
    return {
      loading: null,
      filters: {
        title: null,
        category: null
      }
    }
  },
  computed: {
    selectedCategory() {
      if (this.filters.category) {
        return this.categories
            .find(item => item._id === this.filters.category)
      }
    },
    productsFiltered() {
      let filtered = this.products
      if (this.filters.category) {
        filtered = filtered
            .filter(product => !!this.selectedCategory.productIds.find(productId => productId === product._id))
      }
      if (this.filters.title) {
        filtered = filtered.filter(product =>
            product.title
                .toLowerCase()
                .startsWith(this.filters.title)
        )
      }
      return filtered
    }
  },
  created() {
    this.getProducts()
    this.getCategories()
  },
  methods: {
    updateProductStatus(product) {
      this.loading = product._id
      this.updateProduct(product._id, product.type, { visible: product.visible })
          .then(() => this.loading = null)
    }
  }
}
</script>

<style lang="scss" scoped>
.products {
  padding: 10px;
  &__header {
    margin-bottom: 10px;
    :deep(.el-input) {
      width: 300px;
      margin-right: 10px;
    }
  }
}
</style>
