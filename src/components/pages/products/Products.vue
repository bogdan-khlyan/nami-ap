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
      <el-checkbox v-model="filters.onlyActive">Только активные</el-checkbox>
      <el-button
          class="products__header--btn"
          type="primary" icon="plus"
          @click="$router.push('/products/create')"
      >Добавить продукт</el-button>
    </div>
    <div class="products__table">
      <products-table :productsFiltered="productsFiltered"/>
    </div>
  </div>
</template>

<script>
import productsMixin from "@/api/products/products.mixin";
import categoriesMixin from "@/api/categories/categories.mixin";
import ProductsTable from "@/components/pages/products/components/ProductsTable";

export default {
  name: 'products',
  components: {ProductsTable},
  mixins: [categoriesMixin, productsMixin],
  data() {
    return {
      filters: {
        title: null,
        category: null,
        onlyActive: true
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
      if (this.filters.onlyActive) {
        filtered = filtered
            .filter(product => product.visible)
      }
      if (this.filters.category) {
        filtered = filtered
            .filter(product => !!this.selectedCategory.productIds.find(productId => productId === product._id))
      }
      if (this.filters.title) {
        filtered = filtered.filter(product =>
            product.title
                .toLowerCase()
                .indexOf(this.filters.title.toLowerCase()) !== -1
        )
      }
      return filtered
    }
  },
  created() {
    this.$products.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.products {
  padding: 10px;
  &__header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    :deep(.el-input) {
      width: 300px;
      margin-right: 10px;
    }
    &--btn {
      margin-left: auto;
    }
  }
  &__table {
    :deep(.products__table--description) {
      .cell {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
