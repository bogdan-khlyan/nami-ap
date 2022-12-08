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
      <el-button
          type="warning" icon="document"
          @click="exportProducts"
      >Экспорт</el-button>
    </div>
    <div class="products__table">
      <el-table-draggable
          :data="productsFiltered"
          :disabled="disabledDraggable"
          :key="disabledDraggable"
          @drop="drop"
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
      </el-table-draggable>
    </div>
  </div>
</template>

<script>
import ElTableDraggable from "@/components/common/ElTableDraggable";
import productsMixin from "@/api/products/products.mixin";
import categoriesMixin from "@/api/categories/categories.mixin";
import {exportProducts} from "@/utils/export-products";

export default {
  name: 'products',
  mixins: [categoriesMixin, productsMixin],
  components: { ElTableDraggable },
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
    disabledDraggable() {
      return !this.filters.onlyActive || !this.selectedCategory || !!this.filters.title
    },
    disabledProductIds() {
      if (this.selectedCategory) {
        return this.selectedCategory.productIds
            .filter(productId => this.products.find(item => item._id === productId)?.visible)
      }
    },
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
        const temp = []
        this.selectedCategory.productIds
            .forEach(productId => {
              const product = filtered.find(item => item._id === productId)
              if (product) {
                temp.push(product)
              }
            })
        filtered = temp
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
    this.$categories.getCategories()
  },
  methods: {
    drop({ newIndex, oldIndex }) {
      const ids = this.productsFiltered.map(item => item._id)
      const current = ids.splice(oldIndex, 1)[0]
      ids.splice(newIndex, 0, current)
      console.log(ids)
    },
    exportProducts() {
      exportProducts(
          this.products.filter(item => item.visible),
          this.categories
      )
    },
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
