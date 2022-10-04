<template>
  <div class="product-editor">
    <div>{{ product }}</div>
    <template v-if="product">
      <base-label label="Тим продукта">
        <el-radio-group v-model="product.type" class="ml-4">
          <el-radio label="SINGLE" size="large">Обычный</el-radio>
          <el-radio label="VARIANT" size="large">С вариантами начинок</el-radio>
        </el-radio-group>
      </base-label>
      <div class="product-editor__content">
        <base-card class="product-editor__card">
          <template #header>Основная информация</template>
          <base-label>
            <el-select v-model="product.categories" class="m-2" placeholder="Select" size="large" multiple disabled>
              <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.title"
                  :value="item._id"
              />
            </el-select>
          </base-label>
          <base-label>
            <el-input v-model="product.title" placeholder="Please input" />
          </base-label>
          <base-label>
            <el-input
                v-if="product.type === 'SINGLE'"
                v-model="product.description"
                :rows="2"
                type="textarea"
                placeholder="Описание продукта"
            />
          </base-label>
        </base-card>
        <base-card class="product-editor__card">
          <template #header>Ингридиенты</template>
          <ingredients v-model="product.ingredients"/>
        </base-card>
        <base-card class="product-editor__card">
          <template #header>Начинки</template>
          <variants v-model="product.variants"/>
        </base-card>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import BaseLabel from "@/components/common/BaseLabel";
import categoriesMixin from "@/store/categories/categories.mixin";
import BaseCard from "@/components/common/BaseCard";
import Ingredients from "@/components/pages/productEditor/components/Ingredients";
import Variants from "@/components/pages/productEditor/components/Variants";

export default {
  name: 'product-editor',
  mixins: [categoriesMixin],
  components: { BaseLabel, BaseCard, Ingredients, Variants },
  data() {
    return {
      products: [],
      product: null
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      await this.getProducts()
      this.product = {
        ...this.products.find(item => item._id === this.$route.params.productId),
        variants: [] // TODO remove me
      }
    },
    async getProducts() {
      const response = await axios.get('/api/admin/products')
      this.products = response.data.products
    }
  }
}
</script>

<style lang="scss" scoped>
.product-editor {
  &__card {
    margin-left: 5px;
    margin-right: 5px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__content {
    display: flex;
  }
}
</style>
