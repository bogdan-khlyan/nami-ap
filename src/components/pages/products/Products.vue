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
      <el-table
          :data="productsFiltered"
          style="width: 100%"
      >
        <el-table-column
            property="title"
            label="Наименование"
            width="200px"
        />
        <el-table-column
            class-name="products__table--description"
            property="description"
            label="Описание"
            width="auto"
        />
        <el-table-column
            property="title"
            label="Варианты"
            width="300px"
        >
          <template #default="scope">
            <span v-if="scope.row.type === 'VARIANT'">
              {{ scope.row.variants.map(item => item.title).join('/') }}
            </span>
            <span v-else>Обычный</span>
          </template>
        </el-table-column>
        <el-table-column
            property="weight"
            label="Вес"
            width="120px"
        >
          <template #default="scope">
            <span v-if="scope.row.type === 'SINGLE'">
              {{ scope.row.weight }}
            </span>
            <span v-else>
              {{ scope.row.variants.map(item => item.weight).join('/') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
            property="cost"
            label="Стоимость"
            width="120px"
        >
          <template #default="scope">
            <span v-if="scope.row.type === 'SINGLE'">
              {{ scope.row.cost }}
            </span>
            <span v-else>
              {{ scope.row.variants.map(item => item.cost).join('/') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
            property="visible"
            label="Статус"
            width="120px"
        >
          <template #default="scope">
            <el-switch
                v-model="scope.row.visible"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :loading="loading === scope.row._id"
                @change="updateProductStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column width="80">
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
import productsMixin from "@/api/products/products.mixin";
import categoriesMixin from "@/api/categories/categories.mixin";

export default {
  name: 'products',
  mixins: [categoriesMixin, productsMixin],
  data() {
    return {
      loading: null,
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
  },
  methods: {
    updateProductStatus(product) {
      this.loading = product._id
      this.$products.updateProduct(product._id, product.type, { visible: product.visible })
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
