<template>
  <div class="product-editor">
<!--    <div>{{ product }}</div>-->
    <div class="product-editor__actions">
      <el-button
          type="primary" icon="check"
          @click="save"
      >Сохранить</el-button>
    </div>

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
          <base-label tag="span">
            <el-select
                v-model="product.categories"
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="Категории"
            >
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
          <base-label v-if="product.type === 'SINGLE'">
            <el-input
                v-model="product.description"
                :rows="2"
                type="textarea"
                placeholder="Описание продукта"
            />
          </base-label>
          <div class="product-editor__cost">
            <base-label label="Стоимость">
              <el-input-number v-model="product.cost" :min="0" />
            </base-label>
            <base-label label="Вес">
              <el-input-number v-model="product.weight" :min="0" />
            </base-label>
          </div>
        </base-card>
        <base-card class="product-editor__card">
          <template #header>Ингридиенты</template>
          <ingredients v-model="product.ingredients"/>
        </base-card>
        <base-card v-if="product.type === 'VARIANT'" class="product-editor__card">
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
        // variants: [] // TODO remove me
      }
      this.product.categories = this.categories
          .filter(item => !!item.productIds.find(productId => productId === this.product._id))
          .map(item => item._id)
    },
    async getProducts() {
      const response = await axios.get('/api/admin/products')
      this.products = response.data.products
    },
    async save() {
      console.log('save')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-editor {
  padding: 10px;
  &__card {
    margin-left: 5px;
    margin-right: 5px;
    min-width: 400px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    :deep(.el-select) {
      width: 100%;
    }
  }
  &__content {
    display: flex;
  }
  &__cost {
    display: flex;
    :deep(.base-label) {
      width: 100%;
    }
  }
}
</style>
