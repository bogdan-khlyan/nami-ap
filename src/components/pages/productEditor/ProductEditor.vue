<template>
  <div class="product-editor">
    <base-card>
      <template #header>
        <span>Редактирование продукта</span>
        <el-button
            class="product-editor__header--btn"
            type="primary" icon="check"
            @click="save"
        >Сохранить</el-button>
      </template>

      <template v-if="product">
        <base-label label="Тим продукта">
          <el-radio-group v-model="product.type" :disabled="!isCreate">
            <el-radio label="SINGLE" size="large">Обычный</el-radio>
            <el-radio label="VARIANT" size="large">С вариантами начинок</el-radio>
          </el-radio-group>
        </base-label>
        <div v-if="product.type === 'SINGLE'"
             class="product-editor__images">
          <base-upload-images v-model="product.images"/>
        </div>
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
            <base-label :validator="v$.product.title">
              <el-input v-model="product.title" placeholder="Наименование продукта" />
            </base-label>
            <base-label
                v-if="product.type === 'SINGLE'"
                :validator="v$.product.description">
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
    </base-card>
  </div>
</template>

<script>
import BaseLabel from "@/components/common/BaseLabel";
import categoriesMixin from "@/store/categories/categories.mixin";
import BaseCard from "@/components/common/BaseCard";
import Ingredients from "@/components/pages/productEditor/components/Ingredients";
import Variants from "@/components/pages/productEditor/components/Variants";
import productsMixin from "@/store/products/products.mixin";
import BaseUploadImages from "@/components/common/BaseUploadImages";
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {minLength, required} from "@vuelidate/validators";

export default {
  name: 'product-editor',
  mixins: [categoriesMixin, productsMixin],
  components: { BaseLabel, BaseCard, Ingredients, Variants, BaseUploadImages },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      product: null
    }
  },
  computed: {
    isCreate() {
      return this.productId === 'create'
    },
    productId() {
      return this.$route.params.productId
    }
  },
  created() {
    this.getProducts()
        .then(() => this.getProduct())
  },
  methods: {
    getProduct() {
      if (this.productId === 'create') {
        this.product = {
          type: 'SINGLE',
          images: [],
          title: '',
          description: '',
          cost: 0,
          weight: 0,
          categories: [],
          ingredients: [],
          variants: []
        }
        return
      }
      const product = this.products.find(item => item._id === this.productId)
      this.product = {
        ...product,
        images: product.images.map(image => ({ link: image }))
      }
      this.product.categories = this.categories
          .filter(item => !!item.productIds.find(productId => productId === this.product._id))
          .map(item => item._id)
    },
    async save() {
      this.v$.$touch()
      if (!this.v$.$error) {
        if (this.isCreate) {
          if (this.product.type === 'SINGLE') {
            this.createProduct('SINGLE', {
              title: this.product.title,
              description: this.product.description,
              cost: this.product.cost,
              weight: this.product.weight,
              ingredients: this.product.ingredients,
              visible: false
            })
          }
        }
      }
    }
  },
  validations () {
    if (this.product) {
      if (this.product.type === 'SINGLE') {
        return {
          product: {
            title: {
              required,
              minLength: minLength(5)
            },
            description: {
              required,
              minLength: minLength(5)
            }
          }
        }
      } else {
        return {
          product: {
            title: {
              required,
              minLength: minLength(5)
            }
          }
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.product-editor {
  padding: 10px;
  &__header {
    &--btn {
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: auto;
    }
  }
  &__images {
    margin-bottom: 10px;
  }
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
